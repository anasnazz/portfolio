"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useVelocity } from "framer-motion";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import MenuIcon from "./icons/MenuIcon";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import logo from "../../public/logo.svg";
import useBreakpoint from "../hooks/useBreakpoints";

const navItems = [
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];

function Navbar() {
  const { isMdDown } = useBreakpoint();
  const slideDistance = isMdDown ? 64 : 80;
  const threshold = 200;

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const router = useRouter();
  const pathname = usePathname();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrollingBack, setIsScrollingBack] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const unsubscribe = scrollVelocity.on("change", (latest) => {
      if (latest > 0) {
        setIsScrollingBack(false);
        return;
      }
      if (latest < -threshold) {
        setIsScrollingBack(true);
        return;
      }
    });
    return () => unsubscribe();
  }, [scrollVelocity]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => setIsAtTop(latest <= 0));
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    setIsInView(isScrollingBack || isAtTop);
  }, [isScrollingBack, isAtTop]);

  const handleContactClick = (e) => {
    e.preventDefault();
    setDrawerOpen(false);

    const contactEl = document.getElementById("contact");

    if (contactEl) {
      // Element exists on current page — just scroll
      contactEl.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home, then poll for #contact from the Navbar
      // (Navbar lives in the layout and persists across navigations)
      sessionStorage.setItem("scrollToContact", "true");
      router.push("/");

      let attempts = 0;
      const waitForContact = () => {
        attempts++;
        const el = document.getElementById("contact");
        if (el) {
          // Brief delay to let the page finish its initial scroll
          setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
        } else if (attempts < 200) {
          requestAnimationFrame(waitForContact);
        }
      };
      requestAnimationFrame(waitForContact);
    }
  };

  return (
    <Box sx={{ mt: 0, py: { xs: 0, md: "10px" }, width: "100%", position: 'relative', zIndex: 10 }}>
    <motion.div
      animate={{ y: isInView ? 0 : -slideDistance }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        zIndex: 1000,
        display: "flex",
        top: 0,
        left: 0,
        height: slideDistance,
        width: "100%",
        padding: "0 0 !important",
        alignItems: "stretch",
        backgroundColor: "#ffffff",
      }}
    >
      <Box
        sx={{
          maxWidth: "1170px",
          mx: "auto",
          px: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pt: { xs: "20px", md: "20px" },
            pb: { xs: "10px", md: "10px" },
          }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                position: "relative",
                width: { xs: "100px", sm: "105px", md: "110px" }, 
                height: { xs: "36px", sm: "38px", md: "40px" }, 
              }}
            >
              <Image
                src={logo}
                alt="MD.AT logo"
                fill
                style={{
                  objectFit: "contain",
                  objectPosition: "left center",
                }}
                priority
              />
            </Box>
          </Link>
        </Box>

        {/* Desktop nav links */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            pt: "6px",
            pb: "6px",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={item.label === "Contact" ? handleContactClick : undefined}
              style={{ textDecoration: 'none' }}
            >
              <Typography
                sx={{
                  display: "inline-block",
                  position: "relative",
                  ml: "40px",
                  px: "20px",
                  py: "10px",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: { xs: "18px", md: "24px" },
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: "#000",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "#666",
                  },
                }}
              >
                {item.label}
              </Typography>
            </Link>
          ))}
        </Box>

        {/* Hamburger menu for small screens */}
        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
          <IconButton onClick={() => setDrawerOpen(true)} size="large">
            <MenuIcon color="#000000" size={36} />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <List sx={{ width: "200px" }}>
              {navItems.map((item) => (
                <ListItem
                  key={item.label}
                  component={Link}
                  href={item.href}
                  onClick={(e) => {
                    if (item.label === "Contact") {
                      handleContactClick(e);
                    } else {
                      setDrawerOpen(false);
                    }
                  }}
                  sx={{
                    px: 3,
                    py: 2,
                    fontSize: { xs: "16px", sm: "18px", md: "20px" },
                    fontFamily: "Manrope, sans-serif",
                    color: "#000",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Box>
      </Box>
    </motion.div>
    </Box>
  );
}

export default Navbar;

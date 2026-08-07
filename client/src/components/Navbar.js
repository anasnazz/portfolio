"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useVelocity, AnimatePresence } from "framer-motion";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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

const SlideUp = React.forwardRef(function SlideUp(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Navbar() {
  const { isMdDown } = useBreakpoint();
  const slideDistance = isMdDown ? 64 : 80;
  const threshold = 200;

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
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
    setMenuOpen(false);

    const contactEl = document.getElementById("contact");

    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    } else {
      sessionStorage.setItem("scrollToContact", "true");
      router.push("/");

      let attempts = 0;
      const waitForContact = () => {
        attempts++;
        const el = document.getElementById("contact");
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
        } else if (attempts < 200) {
          requestAnimationFrame(waitForContact);
        }
      };
      requestAnimationFrame(waitForContact);
    }
  };

  const handleNavClick = (e, item) => {
    if (item.label === "Contact") {
      handleContactClick(e);
    } else {
      setMenuOpen(false);
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
          <IconButton onClick={() => setMenuOpen(true)} size="large">
            <MenuIcon color="#000000" size={36} />
          </IconButton>
        </Box>
      </Box>
    </motion.div>

    {/* Fullscreen mobile menu dialog */}
    <Dialog
      fullScreen
      open={menuOpen}
      onClose={() => setMenuOpen(false)}
      TransitionComponent={SlideUp}
      transitionDuration={400}
      sx={{
        display: { md: "none" },
        "& .MuiDialog-paper": {
          backgroundColor: "#000",
          color: "#fff",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          px: "24px",
          py: "20px",
        }}
      >
        {/* Dialog Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "2rem",
          }}
        >
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100px",
                height: "36px",
                filter: "invert(1)",
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
              />
            </Box>
          </Link>
          <IconButton
            onClick={() => setMenuOpen(false)}
            sx={{ color: "#fff" }}
          >
            <CloseIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Box>

        {/* Nav Links */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <AnimatePresence>
            {menuOpen &&
              navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.17, 0.55, 0.55, 1],
                    delay: 0.15 + index * 0.08,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      sx={{
                        fontSize: "48px",
                        fontWeight: 500,
                        fontFamily: "Manrope, sans-serif",
                        color: "#fff",
                        py: "8px",
                        lineHeight: 1.2,
                        transition: "color 0.3s ease",
                        "&:active": { color: "#888" },
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Link>
                </motion.div>
              ))}
          </AnimatePresence>
        </Box>

        {/* Bottom: Email */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: menuOpen ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Box
            sx={{
              borderTop: "1px solid rgba(255,255,255,0.15)",
              pt: "20px",
              pb: "12px",
            }}
          >
            <Typography
              component="a"
              href="mailto:anastnazz@gmail.com"
              sx={{
                fontSize: "16px",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 400,
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                transition: "color 0.3s ease",
                "&:hover": { color: "#fff" },
              }}
            >
              anastnazz@gmail.com
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Dialog>
    </Box>
  );
}

export default Navbar;

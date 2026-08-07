"use client";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const SectionHero = dynamic(() => import("@SectionHero"), { ssr: false });
const SectionFeaturedProject = dynamic(() => import("@/sections/home/SectionFeaturedProject"), { ssr: false });
const SectionContact = dynamic(() => import("@/sections/home/SectionContact"), { ssr: false });

export default function Home() {

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // If Navbar is handling a scroll-to-contact, skip the scroll-past-navbar
    const shouldScrollToContact =
      sessionStorage.getItem("scrollToContact") === "true" ||
      window.location.hash === "#contact";

    if (shouldScrollToContact) {
      sessionStorage.removeItem("scrollToContact");
      return; // Navbar handles the contact scroll directly
    }

    // Default: scroll past the navbar so "hello" starts at the top
    const isMobile = window.innerWidth < 900;
    const scrollTarget = isMobile ? 64 : 100;

    let frameId;
    let attempts = 0;

    const tryScroll = () => {
      attempts++;
      const canScroll =
        document.documentElement.scrollHeight >
        window.innerHeight + scrollTarget;

      if (canScroll || attempts >= 100) {
        window.scrollTo({ top: scrollTarget, behavior: "instant" });
      } else {
        frameId = requestAnimationFrame(tryScroll);
      }
    };

    frameId = requestAnimationFrame(tryScroll);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <Box
      sx={{
        // paddingTop: {xs: "20px", md: "unset"},
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%"
        }}
      >
        <SectionHero />
      </Box>
      <SectionFeaturedProject />
      <SectionContact />
    </Box>
  );
}
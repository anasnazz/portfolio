"use client";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const SectionHero = dynamic(() => import("@SectionHero"), { ssr: false });
const SectionContact = dynamic(() => import("@/sections/home/SectionContact"), { ssr: false });

export default function Home() {

  useEffect(() => {
    if (window.innerWidth < 600) return;

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const navbarHeight = 10;

    setTimeout(() => {
      window.scrollTo({
        top: navbarHeight,
        behavior: "instant" 
      });
    }, 10);

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
      <SectionContact />
    </Box>
  );
}
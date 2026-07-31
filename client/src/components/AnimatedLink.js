"use client";

import React from "react";
import { Box, Link } from "@mui/material";
import { motion, useAnimation } from "framer-motion";

export default function AnimatedLink({ href, children }) {
  const isExternal = href && (href.startsWith("http") || href.startsWith("mailto:"));

  // 1. Create the animation controls
  const controls = useAnimation();

  // 2. Define the hover handlers
  const handleMouseEnter = () => {
    controls.set({ x: "-102%" }); 
    controls.start({ x: "0%" });
  };

  const handleMouseLeave = async () => {
    await controls.start({ x: "102%" });
    controls.set({ x: "-102%" });
  };

  return (
    <Link
      href={href}
      underline="none"
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
        fontFamily: '"Manrope", sans-serif',
        fontSize: { xs: "20px", md: "24px" },
        fontWeight: 500,
        lineHeight: 1.2,
        color: "#000",
        padding: "5px 0",
        cursor: "pointer",
        textDecoration: "none",
      }}
    >
      {/* The Text */}
      <Box component="span" sx={{ position: "relative", zIndex: 2 }}>
        {children}
      </Box>

      {/* The Underline */}
      <Box
        component={motion.div}
        animate={controls} // Connect the controls
        initial={{ x: "-102%" }} // Start hidden on the left
        transition={{
          duration: 0.4,
          ease: [0.25, 1, 0.5, 1], // Smooth easing
        }}
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "2px",
          backgroundColor: "currentColor",
          zIndex: 1,
        }}
      />
    </Link>
  );
}
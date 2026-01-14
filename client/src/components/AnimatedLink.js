"use client";

import React from "react";
import { Box, Link } from "@mui/material";
import { motion, useAnimation } from "framer-motion";

export default function AnimatedLink({ href, children }) {
  // 1. Create the animation controls
  const controls = useAnimation();

  // 2. Define the hover handlers
  const handleMouseEnter = () => {
    // Instantly reset to the left side (invisible) just in case
    controls.set({ x: "-102%" }); 
    // Animate to the visible center
    controls.start({ x: "0%" });
  };

  const handleMouseLeave = async () => {
    // Animate off to the RIGHT side
    await controls.start({ x: "102%" });
    // Once that animation finishes, instantly reset back to LEFT (invisible)
    controls.set({ x: "-102%" });
  };

  return (
    <Link
      href={href}
      underline="none"
      // Remove 'component={motion.a}' here to avoid conflict with manual handlers
      // We attach standard React event listeners instead
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
        color: "#000000ff",
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
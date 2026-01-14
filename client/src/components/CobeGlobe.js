"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { Box } from "@mui/material";

const CobeGlobe = () => {
  const canvasRef = useRef();
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  
  const r = useRef(0); 
  const phi = useRef(0); 
  const containerRef = useRef();

  useEffect(() => {
    let globe;
    let width = 0;

    const updateGlobe = () => {
      if (!containerRef.current) return;
      // Measure the actual width of the parent div
      width = containerRef.current.offsetWidth;

      if (globe) globe.destroy();

      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2, // Keep it square to maintain sphere aspect ratio
        phi: 0,
        theta: 0,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [1, 1, 1],
        markerColor: [132 / 255, 0, 255 / 255],
        glowColor: [1, 1, 1],
        scale: 1, // 1 means it fits exactly to the width
        markers: [{ location: [20.5937, 78.9629], size: 0.08 }],
        onRender: (state) => {
          r.current += (phi.current - r.current) * 0.05;
          state.phi = r.current;
          state.width = width * 2;
          state.height = width * 2;
        },
      });
    };

    // Use ResizeObserver to detect when the grid or window changes size
    const observer = new ResizeObserver(() => updateGlobe());
    if (containerRef.current) observer.observe(containerRef.current);

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 200);

    return () => {
      if (globe) globe.destroy();
      observer.disconnect();
    };
  }, []);

  return (
    <Box 
      ref={containerRef} 
      sx={{ 
        width: "100%", 
        aspectRatio: "1/1",
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center" 
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            phi.current = delta / 200;
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
          userSelect: "none",
          touchAction: "none",
        }}
      />
    </Box>
  );
};

export default CobeGlobe;
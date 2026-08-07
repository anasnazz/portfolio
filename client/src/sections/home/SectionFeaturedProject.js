"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container, Box, Typography, Chip } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Link from "next/link";

const ease = [0.17, 0.55, 0.55, 1];

function SectionFeaturedProject() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: "4rem", md: "6rem" },
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Container
        maxWidth={false}
        sx={{ maxWidth: "1170px", mx: "auto", px: "20px" }}
      >
        {/* Section Label */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              mb: { xs: "1.5rem", md: "2rem" },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "13px", md: "15px" },
                fontWeight: 600,
                color: "#999",
                textTransform: "uppercase",
                letterSpacing: "2.5px",
              }}
            >
              Featured Project
            </Typography>
            <Chip
              label="Ongoing"
              size="small"
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 600,
                fontSize: "11px",
                letterSpacing: "0.5px",
                height: "22px",
                borderRadius: "6px",
              }}
            />
          </Box>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
        >
          <Typography
            sx={{
              fontSize: { xs: "48px", sm: "64px", md: "100px", lg: "120px" },
              fontWeight: 500,
              lineHeight: 1,
              mb: "0.5rem",
            }}
          >
            Relay
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "18px", md: "22px" },
              fontWeight: 400,
              color: "#666",
              mb: { xs: "1.5rem", md: "2rem" },
              maxWidth: "700px",
            }}
          >
            Cross-Platform Low-Latency Communication Framework
          </Typography>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: "1rem", md: "3rem" },
              mb: { xs: "1.5rem", md: "2rem" },
              maxWidth: "900px",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "15px", md: "16px" },
                color: "#555",
                lineHeight: 1.7,
              }}
            >
              An ambitious systems project focused on building a cross-platform
              communication framework for seamless device-to-device
              connectivity. Combines BLE-assisted discovery, Wi-Fi-based
              communication, and platform-specific transport layers across Apple
              and non-Apple ecosystems.
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "15px", md: "16px" },
                color: "#777",
                lineHeight: 1.7,
              }}
            >
              Investigates practical approaches to cross-platform
              interoperability, modular networking architecture, and efficient
              communication protocols for file transfer, device communication,
              and real-time media streaming.
            </Typography>
          </Box>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              mb: { xs: "2rem", md: "2.5rem" },
            }}
          >
            {[
              "C/C++",
              "Swift",
              "Kotlin",
              "BLE",
              "Wi-Fi",
              "Multipeer Connectivity",
              "Distributed Systems",
            ].map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  backgroundColor: "#f5f5f5",
                  color: "#444",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  borderRadius: "8px",
                  height: "28px",
                }}
              />
            ))}
          </Box>
        </motion.div>

        {/* View All Projects Link */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, ease, delay: 0.4 }}
        >
          <Link
            href="/projects"
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#000",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": { gap: "12px" },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "16px", md: "18px" },
                  fontWeight: 500,
                }}
              >
                View all projects
              </Typography>
              <ArrowOutwardIcon sx={{ fontSize: "18px" }} />
            </Box>
          </Link>
        </motion.div>
      </Container>
    </Box>
  );
}

export default SectionFeaturedProject;

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container, Box, Typography, Chip } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const projects = [
  {
    id: "01",
    title: "Relay",
    subtitle: "Cross-Platform Low-Latency Communication Framework",
    status: "Ongoing",
    description:
      "An ambitious systems project focused on building a cross-platform communication framework for seamless device-to-device connectivity. The architecture combines BLE-assisted discovery, Wi-Fi-based communication, and platform-specific transport layers to provide fast and reliable connectivity across Apple and non-Apple ecosystems while maintaining low latency and high reliability.",
    details:
      "Investigates practical approaches to cross-platform interoperability, modular networking architecture, and efficient communication protocols that can support future applications such as file transfer, device communication, and real-time media streaming.",
    tags: [
      "C/C++",
      "Swift",
      "Kotlin",
      "BLE",
      "Wi-Fi",
      "Multipeer Connectivity",
      "Distributed Systems",
    ],
    link: null,
  },
  {
    id: "02",
    title: "Muvv",
    subtitle: "AR Indoor Navigation System",
    status: null,
    description:
      "An Android-based indoor navigation prototype exploring markerless indoor localization using augmented reality technologies. Leverages ARCore for persistent room mapping while providing an intuitive navigation experience within indoor environments.",
    details:
      "Incorporates multi-anchor localization, JSON-based navigation graphs, Room Database integration, and a Jetpack Compose interface. Research includes combining visual localization with inertial sensor data to improve navigation accuracy and reliability.",
    tags: [
      "Kotlin",
      "Jetpack Compose",
      "ARCore",
      "OpenGL ES",
      "Room Database",
      "SQLite",
    ],
    link: null,
  },
  {
    id: "03",
    title: "Royal Gold Algo",
    subtitle: "Financial Trading Platform Website",
    status: null,
    description:
      "A production-ready marketing website developed for a financial trading platform. Focused on delivering a responsive, modern, and high-performance user experience while integrating real-time financial market data.",
    details:
      "Features responsive layouts, modern UI components, TradingView chart integration, and performance-focused frontend architecture. Developed as a freelance project, providing valuable experience in client communication and production deployment.",
    tags: [
      "React",
      "JavaScript",
      "Material UI",
      "Tailwind CSS",
      "TradingView API",
    ],
    link: "https://royalgoldalgo.com/",
  },
  {
    id: "04",
    title: "Fake News Detection",
    subtitle: "AI-Powered News Classification System",
    status: null,
    description:
      "A machine learning application designed to classify news articles using Natural Language Processing techniques. Includes a complete pipeline covering data preprocessing, text cleaning, feature extraction using TF-IDF, model training, evaluation, and REST API integration.",
    details:
      "Initially developed with Flask, the backend was later migrated to a MERN stack to improve scalability and provide a more modern application structure. Provided practical experience in ML workflows, backend development, and deploying AI models within real-world web applications.",
    tags: [
      "Python",
      "Scikit-learn",
      "TensorFlow",
      "React",
      "Node.js",
      "MongoDB",
      "NLP",
      "TF-IDF",
    ],
    link: null,
  },
];

const ease = [0.17, 0.55, 0.55, 1];

export default function ProjectsPage() {
  return (
    <Box sx={{ minHeight: "100vh", pt: { xs: "2rem", md: "2rem" }, pb: "4rem" }}>
      <Container
        maxWidth={false}
        sx={{ maxWidth: "1170px", mx: "auto", px: "20px" }}
      >
        {/* Header */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease }}
        >
          <Typography
            sx={{
              fontSize: { xs: "60px", sm: "80px", md: "140px" },
              fontWeight: 500,
              lineHeight: 1,
              mb: "0.5rem",
            }}
          >
            Projects
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "18px", md: "22px" },
              fontWeight: 400,
              color: "#666",
              mb: { xs: "2rem", md: "3rem" },
              maxWidth: "600px",
            }}
          >
            Things I&apos;ve built, researched, and shipped.
          </Typography>
        </motion.div>

        {/* Project List */}
        <Box>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease,
                delay: 0.2 + index * 0.12,
              }}
            >
              <Box
                component={project.link ? "a" : "div"}
                href={project.link || undefined}
                target={project.link ? "_blank" : undefined}
                rel={project.link ? "noopener noreferrer" : undefined}
                sx={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  py: { xs: "2rem", md: "3rem" },
                  borderTop: index === 0 ? "1px solid #e0e0e0" : "none",
                  borderBottom: "1px solid #e0e0e0",
                  transition: "all 0.3s ease",
                  cursor: project.link ? "pointer" : "default",
                  "&:hover": project.link
                    ? {
                        backgroundColor: "#fafafa",
                        px: { xs: "12px", md: "20px" },
                        mx: { xs: "-12px", md: "-20px" },
                      }
                    : {},
                }}
              >
                {/* Top Row: Number + Status */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#bbb",
                      fontFamily: "monospace",
                    }}
                  >
                    {project.id}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {project.status && (
                      <Chip
                        label={project.status}
                        size="small"
                        sx={{
                          backgroundColor: "#000",
                          color: "#fff",
                          fontFamily: "Manrope, sans-serif",
                          fontWeight: 600,
                          fontSize: "11px",
                          letterSpacing: "0.5px",
                          height: "24px",
                          borderRadius: "6px",
                        }}
                      />
                    )}
                    {project.link && (
                      <ArrowOutwardIcon
                        sx={{ fontSize: "18px", color: "#999" }}
                      />
                    )}
                  </Box>
                </Box>

                {/* Title + Subtitle */}
                <Typography
                  sx={{
                    fontSize: { xs: "28px", sm: "32px", md: "40px" },
                    fontWeight: 600,
                    lineHeight: 1.15,
                    mb: "6px",
                  }}
                >
                  {project.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: 400,
                    color: "#888",
                    mb: { xs: "1rem", md: "1.25rem" },
                  }}
                >
                  {project.subtitle}
                </Typography>

                {/* Description */}
                <Typography
                  sx={{
                    fontSize: { xs: "15px", md: "16px" },
                    color: "#555",
                    lineHeight: 1.7,
                    maxWidth: "800px",
                    mb: "6px",
                  }}
                >
                  {project.description}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "15px", md: "16px" },
                    color: "#777",
                    lineHeight: 1.7,
                    maxWidth: "800px",
                    mb: "1.25rem",
                  }}
                >
                  {project.details}
                </Typography>

                {/* Tags */}
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                >
                  {project.tags.map((tag) => (
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
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
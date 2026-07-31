"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container, Box, Typography, Chip } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio built with Next.js, MUI, and Framer Motion. Features smooth scroll animations, responsive design, and a clean minimalist aesthetic.",
    tags: ["Next.js", "MUI", "Framer Motion"],
    link: "#",
  },
  {
    title: "Project Two",
    description:
      "Coming soon — An exciting project currently in development. Stay tuned for updates.",
    tags: ["React", "Node.js"],
    link: "#",
  },
  {
    title: "Project Three",
    description:
      "Coming soon — Another project in the pipeline. More details will be shared soon.",
    tags: ["Python", "Machine Learning"],
    link: "#",
  },
];

export default function ProjectsPage() {
  return (
    <Box sx={{ minHeight: "100vh", pt: { xs: "2rem", md: "2rem" } }}>
      <Container
        maxWidth={false}
        sx={{ maxWidth: "1170px", mx: "auto", px: "20px" }}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.17, 0.55, 0.55, 1] }}
        >
          <Typography
            sx={{
              fontSize: { xs: "60px", sm: "80px", md: "140px" },
              fontWeight: 500,
              lineHeight: 1,
              mb: "1rem",
            }}
          >
            Projects
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "18px", md: "22px" },
              fontWeight: 400,
              color: "#666",
              mb: "3rem",
              maxWidth: "600px",
            }}
          >
            A collection of things I&apos;ve built and am working on.
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: "24px",
            pb: "4rem",
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.17, 0.55, 0.55, 1],
                delay: 0.2 + index * 0.15,
              }}
            >
              <Box
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "16px",
                  p: { xs: "24px", md: "32px" },
                  height: "100%",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "#000",
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: "16px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "22px", md: "26px" },
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    {project.title}
                  </Typography>
                  <ArrowOutwardIcon
                    sx={{ fontSize: "20px", color: "#999", mt: "4px" }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#666",
                    lineHeight: 1.6,
                    mb: "20px",
                  }}
                >
                  {project.description}
                </Typography>
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
                        color: "#333",
                        fontFamily: "Manrope, sans-serif",
                        fontWeight: 500,
                        fontSize: "13px",
                        borderRadius: "8px",
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
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container, Box, Typography, Chip, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const skills = [
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "MUI",
  "Framer Motion",
  "Git",
  "HTML/CSS",
  "MongoDB",
];

export default function ResumePage() {
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
            Resume
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.17, 0.55, 0.55, 1],
            delay: 0.2,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{
              mb: "3rem",
              borderColor: "#000",
              color: "#000",
              borderRadius: "50px",
              px: "24px",
              py: "10px",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#000",
                color: "#fff",
                borderColor: "#000",
              },
            }}
          >
            Download PDF
          </Button>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.17, 0.55, 0.55, 1],
            delay: 0.3,
          }}
        >
          <Box sx={{ mb: "3rem" }}>
            <Typography
              sx={{
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 500,
                color: "#999",
                textTransform: "uppercase",
                letterSpacing: "2px",
                mb: "1.5rem",
              }}
            >
              Education
            </Typography>
            <Box sx={{ borderLeft: "2px solid #e0e0e0", pl: "24px" }}>
              <Typography
                sx={{
                  fontSize: { xs: "22px", md: "28px" },
                  fontWeight: 600,
                  mb: "4px",
                }}
              >
                B.Tech in Computer Science &amp; Engineering
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "16px", md: "18px" },
                  color: "#666",
                  mb: "8px",
                }}
              >
                2022 — Present
              </Typography>
              <Typography
                sx={{ fontSize: "16px", color: "#888", lineHeight: 1.6 }}
              >
                Currently pursuing my degree with a focus on software
                development, algorithms, and machine learning.
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.17, 0.55, 0.55, 1],
            delay: 0.4,
          }}
        >
          <Box sx={{ mb: "3rem" }}>
            <Typography
              sx={{
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 500,
                color: "#999",
                textTransform: "uppercase",
                letterSpacing: "2px",
                mb: "1.5rem",
              }}
            >
              Skills
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                >
                  <Chip
                    label={skill}
                    sx={{
                      backgroundColor: "#f5f5f5",
                      color: "#333",
                      fontFamily: "Manrope, sans-serif",
                      fontWeight: 500,
                      fontSize: { xs: "14px", md: "15px" },
                      borderRadius: "10px",
                      py: "20px",
                      px: "8px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#000",
                        color: "#fff",
                      },
                    }}
                  />
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.17, 0.55, 0.55, 1],
            delay: 0.5,
          }}
        >
          <Box sx={{ mb: "3rem", pb: "4rem" }}>
            <Typography
              sx={{
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 500,
                color: "#999",
                textTransform: "uppercase",
                letterSpacing: "2px",
                mb: "1.5rem",
              }}
            >
              Experience
            </Typography>
            <Typography
              sx={{ fontSize: "16px", color: "#888", fontStyle: "italic" }}
            >
              Building cool things and gaining experience — more details coming
              soon.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

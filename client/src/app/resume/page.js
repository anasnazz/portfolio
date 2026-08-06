"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container, Box, Typography, Chip, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const education = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science and Engineering",
    period: "2022 — 2026",
    description:
      "Focused on software engineering, networking, operating systems, distributed systems, machine learning, and modern application development while building practical projects across multiple domains.",
  },
];

const experience = [
  {
    role: "Chief Creative Officer",
    org: "IEDC, MEA Engineering College",
    period: "2025 — 2026",
    description:
      "Led creative initiatives and branding efforts for innovation-driven events, workshops, and startup programs. Collaborated with multidisciplinary teams to design digital assets, improve event visibility, and strengthen the organization\u2019s visual identity while coordinating creative workflows across student teams.",
  },
  {
    role: "Assistant Creative Officer",
    org: "IEDC, MEA Engineering College",
    period: "2023 — 2025",
    description:
      "Supported branding and promotional activities for technical events, entrepreneurship programs, and student initiatives. Contributed to graphic design, digital media, and event marketing while working closely with organizing teams to deliver consistent visual communication.",
  },
];

const skillCategories = [
  {
    label: "Languages",
    skills: ["JavaScript", "Python", "Java", "C", "SQL"],
  },
  {
    label: "Frontend",
    skills: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS", "Material UI"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    label: "Mobile",
    skills: ["Kotlin", "Jetpack Compose", "Android"],
  },
  {
    label: "Databases",
    skills: ["MongoDB", "PostgreSQL", "SQLite", "Firebase"],
  },
  {
    label: "AI / ML",
    skills: [
      "Scikit-learn",
      "TensorFlow",
      "NLP",
      "TF-IDF",
      "Logistic Regression",
    ],
  },
  {
    label: "Systems & Networking",
    skills: [
      "BLE",
      "Wi-Fi",
      "P2P Communication",
      "Distributed Systems",
      "Protocol Design",
      "Low-Latency",
    ],
  },
  {
    label: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Postman", "Linux"],
  },
];

const certifications = [
  {
    title: "Certified Penetration Tester (CPT)",
    org: "RedTeam Hacker Academy",
    date: "August 2022",
    credentialId: "RTHACPT1140",
    description:
      "Industry-recognized certification demonstrating practical skills in penetration testing, ethical hacking, vulnerability assessment, network security, and exploitation techniques.",
    skills: [
      "Penetration Testing",
      "Ethical Hacking",
      "Network Security",
      "Metasploit",
      "Nmap",
      "Wireshark",
    ],
  },
  {
    title: "Recognition — Assistant Creative Officer",
    org: "IEDC MEA Engineering College",
    date: "June 2024",
    credentialId: "MEAIEDCEXC232426",
    description:
      "Awarded in recognition of contributions as Assistant Creative Officer. Recognized for leading creative initiatives, branding, event promotions, and supporting innovation activities.",
    skills: [
      "Creative Leadership",
      "Brand Design",
      "Event Management",
      "Digital Marketing",
    ],
  },
];

const ease = [0.17, 0.55, 0.55, 1];

function SectionLabel({ children }) {
  return (
    <Typography
      sx={{
        fontSize: { xs: "13px", md: "15px" },
        fontWeight: 600,
        color: "#999",
        textTransform: "uppercase",
        letterSpacing: "2.5px",
        mb: "1.5rem",
      }}
    >
      {children}
    </Typography>
  );
}

function TimelineItem({ title, subtitle, period, description, isLast }) {
  return (
    <Box
      sx={{
        position: "relative",
        pl: { xs: "24px", md: "32px" },
        pb: isLast ? 0 : "2rem",
        borderLeft: isLast ? "none" : "1px solid #e0e0e0",
        "&::before": {
          content: '""',
          position: "absolute",
          left: "-5px",
          top: "6px",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: "#000",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: "4px",
          mb: "6px",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "20px", md: "24px" },
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#999",
            fontFamily: "monospace",
            whiteSpace: "nowrap",
          }}
        >
          {period}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: { xs: "15px", md: "16px" },
          fontWeight: 500,
          color: "#888",
          mb: "8px",
        }}
      >
        {subtitle}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "14px", md: "15px" },
          color: "#666",
          lineHeight: 1.7,
          maxWidth: "700px",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}

export default function ResumePage() {
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
              mb: "1.5rem",
            }}
          >
            Resume
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
        >
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{
              mb: { xs: "2.5rem", md: "3.5rem" },
              borderColor: "#000",
              color: "#000",
              borderRadius: "50px",
              px: "28px",
              py: "10px",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 500,
              fontSize: "15px",
              textTransform: "none",
              transition: "all 0.3s ease",
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
          transition={{ duration: 0.8, ease, delay: 0.25 }}
        >
          <Box sx={{ mb: { xs: "2.5rem", md: "3.5rem" } }}>
            <SectionLabel>Education</SectionLabel>
            {education.map((edu, i) => (
              <TimelineItem
                key={i}
                title={edu.degree}
                subtitle={edu.field}
                period={edu.period}
                description={edu.description}
                isLast={i === education.length - 1}
              />
            ))}
          </Box>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.35 }}
        >
          <Box sx={{ mb: { xs: "2.5rem", md: "3.5rem" } }}>
            <SectionLabel>Experience</SectionLabel>
            {experience.map((exp, i) => (
              <TimelineItem
                key={i}
                title={exp.role}
                subtitle={exp.org}
                period={exp.period}
                description={exp.description}
                isLast={i === experience.length - 1}
              />
            ))}
          </Box>
        </motion.div>

        {/* Technical Skills */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.45 }}
        >
          <Box sx={{ mb: { xs: "2.5rem", md: "3.5rem" } }}>
            <SectionLabel>Technical Skills</SectionLabel>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "1fr 1fr 1fr 1fr",
                },
                gap: { xs: "1.5rem", md: "2rem" },
              }}
            >
              {skillCategories.map((category) => (
                <Box key={category.label}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#bbb",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      mb: "10px",
                    }}
                  >
                    {category.label}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                    }}
                  >
                    {category.skills.map((skill, idx) => (
                      <motion.div
                        key={skill}
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.55 + idx * 0.03,
                        }}
                      >
                        <Chip
                          label={skill}
                          size="small"
                          sx={{
                            backgroundColor: "#f5f5f5",
                            color: "#333",
                            fontFamily: "Manrope, sans-serif",
                            fontWeight: 500,
                            fontSize: "12px",
                            borderRadius: "8px",
                            height: "28px",
                            transition: "all 0.25s ease",
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
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.55 }}
        >
          <Box>
            <SectionLabel>Certifications</SectionLabel>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: "20px",
              }}
            >
              {certifications.map((cert) => (
                <Box
                  key={cert.credentialId}
                  sx={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "16px",
                    p: { xs: "20px", md: "28px" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#000",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "18px", md: "20px" },
                      fontWeight: 600,
                      lineHeight: 1.3,
                      mb: "6px",
                    }}
                  >
                    {cert.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: { xs: "2px", sm: "12px" },
                      mb: "10px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#888",
                        fontWeight: 500,
                      }}
                    >
                      {cert.org}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#bbb",
                        fontFamily: "monospace",
                      }}
                    >
                      {cert.date}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#bbb",
                      fontFamily: "monospace",
                      mb: "12px",
                    }}
                  >
                    ID: {cert.credentialId}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#666",
                      lineHeight: 1.6,
                      mb: "14px",
                    }}
                  >
                    {cert.description}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                    }}
                  >
                    {cert.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          backgroundColor: "#f5f5f5",
                          color: "#444",
                          fontFamily: "Manrope, sans-serif",
                          fontWeight: 500,
                          fontSize: "11px",
                          borderRadius: "6px",
                          height: "24px",
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

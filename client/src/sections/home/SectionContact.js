"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container, Box, Typography } from "@mui/material";
import AnimatedLink from "@/components/AnimatedLink";

function SectionContact() {
  return (
    <Box
      id="contact"
      component="section"
      sx={{
        py: { xs: "4rem", md: "6rem" },
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1170px",
          mx: "auto",
          px: "20px",
        }}
      >
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: [0.17, 0.55, 0.55, 1],
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "60px", sm: "80px", md: "140px" },
              fontWeight: 500,
              lineHeight: 1,
              mb: { xs: "1.5rem", md: "2rem" },
            }}
          >
            Let&apos;s Talk
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.8,
            ease: [0.17, 0.55, 0.55, 1],
            delay: 0.2,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "18px", md: "22px" },
              fontWeight: 400,
              color: "#666",
              maxWidth: "600px",
              lineHeight: 1.6,
              mb: { xs: "2rem", md: "3rem" },
            }}
          >
            Have a project in mind, want to collaborate, or just want to say
            hello? I&apos;d love to hear from you.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.8,
            ease: [0.17, 0.55, 0.55, 1],
            delay: 0.3,
          }}
        >
          <Box sx={{ mb: "2rem" }}>
            <Typography
              sx={{
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 500,
                color: "#999",
                textTransform: "uppercase",
                letterSpacing: "2px",
                mb: "1rem",
              }}
            >
              Email
            </Typography>
            <AnimatedLink href="mailto:anastnazz@gmail.com">
              anastnazz@gmail.com
            </AnimatedLink>
          </Box>
        </motion.div>

        <Box
          sx={{
            width: "100%",
            height: "1px",
            backgroundColor: "#e0e0e0",
            my: "2rem",
          }}
        />

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.8,
            ease: [0.17, 0.55, 0.55, 1],
            delay: 0.4,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "14px", md: "16px" },
              fontWeight: 500,
              color: "#999",
              textTransform: "uppercase",
              letterSpacing: "2px",
              mb: "1rem",
            }}
          >
            Socials
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: "0px", sm: "20px" },
            }}
          >
            <AnimatedLink href="https://instagram.com/anas.nazz">
              Instagram
            </AnimatedLink>
            <AnimatedLink href="https://www.linkedin.com/in/anas-nazz">
              LinkedIn
            </AnimatedLink>
            <AnimatedLink href="https://github.com/anasthottassery">
              GitHub
            </AnimatedLink>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default SectionContact;

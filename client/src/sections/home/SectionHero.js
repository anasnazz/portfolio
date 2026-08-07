"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Container, Box, Typography } from "@mui/material";
import Image from "next/image";
import SelfPortrait from "../../../public/self_portrait.png";
import useBreakpoint from "@useBreakpoints";
import AnimatedLink from "@/components/AnimatedLink";

function SectionHero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  const bp = useBreakpoint();
  const scrollEnd = bp.isMdUp ? 1000 : 400;
  const scrollStart = bp.isMdUp ? 110 : 0;

  const xStart = bp.isMdUp ? "0%" : "5%";
  const xEnd = bp.isMdUp ? "60%" : "48%";

  const invStart = bp.isMdUp ? "0%" : "5%";
  const invEnd = bp.isMdUp ? "-40%" : "-30%";

  const x = useTransform(scrollY, [scrollStart, scrollEnd], [xStart, xEnd]);
  const invertedX = useTransform(scrollY, [scrollStart, scrollEnd], [invStart, invEnd]);

  const heroHelloTop = bp.isMdUp ? "80px" : "0px";

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1170px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: { xs: "3rem 20px 1rem", md: "1.5rem 20px" },
        zIndex: 0,
      }}
    >
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.17, 0.55, 0.55, 1],
          delay: 0,
        }}
        style={{
          zIndex: 1,
          top: heroHelloTop,
          position: "relative",
          textAlign: "left",
        }}
      >
        <motion.div style={{ x }}>
          <Typography
            sx={{
              marginTop: { xs: "0", md: "unset" },
              fontSize: { xs: "120px", sm: "140px", md: "290px", lg: "350px" },
              fontWeight: 500,
              lineHeight: 1,
              overflow: "hidden",
            }}
          >
            hello
          </Typography>
        </motion.div>
      </motion.div>

      {/* hero-text-container */}
      <Box
        sx={{
          position: "relative",
          top: { xs: "-40px", md: "unset" },
        }}
      >
        <Box
          sx={{
            display: "grid",
            columnGap: { xs: "10px", md: "30px" },
            rowGap: "30px",
            gridTemplateColumns: {
              xs: "1fr 7fr 1fr",
              sm: "1fr 5fr 1fr",
              md: "repeat(8, 1fr)",
            },
            gridTemplateRows: "auto auto",
            gridAutoColumns: "1fr",
          }}
        >
          <Box
            sx={{
              gridRow: "1 / 4",
              gridColumn: { xs: "1 / 3", sm: "1 / 4", md: "2 / 6" },
              // gridColumnEnd: {
              //   sm: "3",
              //   md: "4",
              //   lg: "auto",
              // },
            }}
          >
            {/* Black Text */}
            <Box
              sx={{
                zIndex: 1,
                position: "relative",
              }}
            >
              <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  ease: [0.17, 0.55, 0.55, 1],
                  delay: 0.5,
                }}
                style={{
                  width: "200vw",
                  position: "absolute",
                  top: "10vh",
                  bottom: "auto",
                  left: 0,
                  right: "auto",
                }}
              >
                <motion.div style={{ x: invertedX }}>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "120px",
                        sm: "140px",
                        md: "290px",
                        lg: "350px",
                      },
                      marginTop: { xs: "0", md: "unset" },
                      fontWeight: 500,
                      lineHeight: 1,
                      overflow: "hidden",
                    }}
                  >
                    I&apos;m Anas
                  </Typography>
                </motion.div>
              </motion.div>
            </Box>

            {/* White Text */}
            <Box sx={{ position: "relative", zIndex: 2, overflow: "hidden" }}>
              <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  ease: [0.17, 0.55, 0.55, 1],
                  delay: 0.5,
                }}
              >
                <Image
                  src={SelfPortrait}
                  alt="Hero Portrait"
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    display: "inline-block",
                  }}
                  priority
                />
              </motion.div>
              <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  ease: [0.17, 0.55, 0.55, 1],
                  delay: 0.5,
                }}
                style={{
                  width: "200vw",
                  position: "absolute",
                  top: "10vh",
                  bottom: "auto",
                  left: 0,
                  right: "auto",
                }}
              >
                <motion.div style={{ x: invertedX }}>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "120px",
                        sm: "140px",
                        md: "290px",
                        lg: "350px",
                      },
                      fontWeight: 500,
                      lineHeight: 1,
                      overflow: "hidden",
                      color: "#fff",
                    }}
                  >
                    I&apos;m Anas
                  </Typography>
                </motion.div>
              </motion.div>
            </Box>
          </Box>

          {/* Description */}
          <Box
            sx={{
              // Align vertically: Mobile = row 4, Desktop = row 3 (bottom of image)
              gridRow: { xs: "4 / 5", md: "3 / 4" },

              // Align horizontally: Mobile = full width, Desktop = Cols 6 to 9 (Right of image)
              gridColumn: {
                xs: "1 / 4", // Spans the specific mobile grid columns defined in parent
                sm: "1 / 4", // Adjust based on your tablet grid
                md: "6 / 9", // THIS aligns it to the right of the image
              },

              // Remove gridColumnStart - it was breaking the alignment
              alignSelf: "end",
            }}
          >
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
                ease: [0.17, 0.55, 0.55, 1],
                delay: 0.5,
              }}
            >
              <Typography
                sx={{
                  mt: "10px",
                  mb: "10px",
                  fontSize: { xs: "24px", md: "28px" },
                  fontWeight: { xs: 400, md: 500 },
                  lineHeight: 1.3,
                }}
              >
                I&apos;m a CS student turning ideas into reality. I&apos;m
                developing my skills and building projects you can explore on my
                website. Let&apos;s see what we can create together! 👋
              </Typography>
            </motion.div>
          </Box>
        </Box>
        <Box
          sx={{
            padding: { xs: "1.5rem 0px 0px", md: "3rem 0px" },
            maxWidth: "1170px",
            margin: "0 auto",
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: { xs: "20px", md: "0" },
          }}
        >
          {/* Socials Group */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: "0px", sm: "20px" }, // Added gap between links
            }}
          >
            <AnimatedLink href="https://instagram.com/anas.nazz">Instagram</AnimatedLink>
            <AnimatedLink href="https://www.linkedin.com/in/anasthottassery">LinkedIn</AnimatedLink>
            <AnimatedLink href="https://github.com/anasthottassery">GitHub</AnimatedLink>
          </Box>

          {/* Email Group */}
          <Box sx={{ alignSelf: { xs: "flex-start", md: "center" } }}>
            <AnimatedLink href="mailto:thottassery.anas@gmail.com">
              thottassery.anas@gmail.com
            </AnimatedLink>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default SectionHero;

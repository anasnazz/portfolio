import { ScrollRestoration } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import React, { useRef } from 'react'
import './Home.css'
import Navbar from '../global/Navbar'
import { Box, Container, Typography } from '@mui/material'
import SelfPortrait from '../../assets/self_portrait.png';

function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref
  });
  const isInView = useInView(ref, { once: true });

  const x = useTransform(scrollYProgress, [0.1, 1], ["0%", "60%"])
  const invertedX = useTransform(scrollYProgress, [0.1, 1], ["0%", "-40%"])

  return (
    <Box ref={ref} className="container">
      <Box className="fixed-nav">
        <Navbar />
      </Box>
      <Box className="section-hero">
        <Container>
          <motion.div
            style={{
              transform: isInView ? "none" : "translateY(200px)",
              opacity: isInView ? 1 : 0,
              transition: "all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1) 0s",

            }}
          >
            <motion.div style={{ x }} className="hero-hello">
              <Typography className="hero-text" >hello</Typography>
            </motion.div>
          </motion.div>
          <Box className="hero-text-container">
            <Box id="hero-content">
              <Box className="hero-black-text">
                <motion.div
                  style={{
                    transform: isInView ? "none" : "translateY(200px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                  }}
                  className="hero-text-content"
                >
                  <motion.div style={{ x: invertedX }}>
                    <Typography className="hero-text" >I'm Anas</Typography>
                  </motion.div>
                </motion.div>
              </Box>
              <Box className="hero-white-text">
                <motion.div
                  style={{
                    transform: isInView ? "none" : "translateX(200px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                  }}
                >
                  <img className='hero-picture' src={SelfPortrait} alt='Hero Portrait'></img>
                </motion.div>
                <motion.div
                  className="hero-text-content"
                  style={{
                    transform: isInView ? "none" : "translateY(200px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                  }}
                >
                  <motion.div style={{ x: invertedX }}>
                    <Typography className="hero-text white-text" >I'm Anas</Typography>
                  </motion.div>
                </motion.div>
              </Box>

            </Box>
            <motion.div
              style={{
                opacity: isInView ? 1 : 0,
                transition: "all 0.5s easein 1.2s"
              }}
              id="hero-description"
            >

              <Typography className="hero-description" >I'm a CS student turning ideas into reality.  I'm developing my skills and building projects you can explore on my website. Let's see what we can create together! 👋</Typography>

            </motion.div>
          </Box>
          <Box className="connect-container">
            <Box className="connect-social">
              <Typography className="social-link" >Instragram</Typography>
              <Typography className="social-link" >LinkedIn</Typography>
              <Typography className="social-link" >GitHub</Typography>
            </Box>
            <Box className="connect-mail">
              <Typography className="mail-link" >anastnazz@gmail.com</Typography>
            </Box>
          </Box>
          {/* <ScrollRestoration /> */}

        </Container>
      </Box >
    </Box >
  )
}

export default Home
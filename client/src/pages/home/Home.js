import React from 'react'
import './Home.css'
import Navbar from '../global/Navbar'
import { Box, Container, Typography } from '@mui/material'
import SelfPortrait from '../../assets/self_portrait.png';

function Home() {
  return (
    <Box className="container">
      <Box className="fixed-nav">
        <Navbar />
      </Box>
      <Box className="section-hero">
        <Container>
          <Box className="hero-hello">
            <Typography className="hero-text" >hello</Typography>
          </Box>
          <Box className="hero-text-container">
            <Box id="hero-content">
              <Box className="hero-black-text">
                <Box className="hero-text-content">
                  <Typography className="hero-text" >I'm Anas</Typography>
                </Box>
              </Box>
              <Box className="hero-white-text">
                <img className='hero-picture' src={SelfPortrait} alt='Hero Portrait'></img>
              </Box>
            </Box>
            <Box id="hero-description">
              <Typography className="hero-description" >I'm a CS student turning ideas into reality.  I'm developing my skills and building projects you can explore on my website. Let's see what we can create together! 👋</Typography>
            </Box>
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
        </Container>
      </Box>
    </Box>
  )
}

export default Home
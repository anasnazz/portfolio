import React, { useState, useEffect } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.svg'
import { motion, useScroll, useVelocity } from "framer-motion";
import { Box, Typography } from '@mui/material'

function Navbar() {

  const slideDistance = 80;
  const threshold = 200;

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const [isScrollingBack, setIsScrollingBack] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isInView, setIsInView] = useState(true);

  useEffect(
    () =>
      scrollVelocity.onChange((latest) => {
        if (latest > 0) {
          setIsScrollingBack(false);
          return;
        }
        if (latest < -threshold) {
          setIsScrollingBack(true);
          return;
        }
      }),
    [scrollVelocity]
  );

  useEffect(() => scrollY.onChange((latest) => setIsAtTop(latest <= 0)), [scrollY]);

  useEffect(() => setIsInView(isScrollingBack || isAtTop), [
    isScrollingBack,
    isAtTop
  ]);

  return (
    <motion.div
      className="navbar"
      animate={{ y: isInView ? 0 : -slideDistance }}
      transition={{ duration: 0.5, delay: 0, ease: "easeInOut" }}
      style={{ height: slideDistance }}
    >
      {/* <Container> */}
      <Box className="nav-container">

        <Box className="nav-brand">
          <img className="nav-logo" src={logo} alt='mat logo' />
        </Box>
        <Box className="nav-menu">
          <Typography className="nav-link" >Projects</Typography>
          <Typography className="nav-link" >Resume</Typography>
          <Typography className="nav-link" >Contact</Typography>
        </Box>
      </Box>
      {/* </Container> */}
    </motion.div>
  )
}

export default Navbar
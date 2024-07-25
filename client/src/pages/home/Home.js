import React, { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import './Home.css'
import Navbar from '../global/Navbar'
import SectionHero from "./components/SectionHero";
import SectionMarquee from './components/SectionMarquee';
import OverlappingScroll from './test';

function Home() {
  const ref = useRef(null);
  useEffect(() => {
    const desiredScrollTop = ref.current?.offsetTop || 0; // Get offset of the element
    window.scrollTo({ top: desiredScrollTop, behavior: 'smooth' });
  }, []);

  return (
    <Box className="main-home">
      <Box className="fixed-nav">
        <Navbar />
      </Box>
      <Box ref={ref} className="section-hero">
        <SectionHero />
      </Box >
      <SectionMarquee />
      {/* <Box className="test"></Box> */}
    </Box >
      // <OverlappingScroll/>
  )
}

export default Home
import React, { Fragment } from 'react'
import { Box } from '@mui/material'
import { motion } from "framer-motion";
import './SectionMarquee.css'


function SectionMarquee() {
  const text1 = "Designing digital blueprints for the future. Designing digital blueprints for the future.";
  const text2 = "Building the future, one creative idea at a time. Building the future, one creative idea at a time.";
  const text3 = "Where art meets engineering. Where art meets engineering.";
  const words1 = text1.split(' ');
  const words2 = text2.split(' ');
  const words3 = text3.split(' ');

  let marqueeForwards = (duration) => {
    return {
      animate: {
        x: [0, -850], // Adjust -1000 based on your content width
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: duration, // Adjust duration for animation speed
            ease: "linear", // Change ease for different transition styles
          },
        },
      },
    };
  }
  let marqueeBackwards = (duration) => {
    return {
      animate: {
        x: [-800, 0], // Adjust -1000 based on your content width
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: duration, // Adjust duration for animation speed
            ease: "linear", // Change ease for different transition styles
          },
        },
      },
    };
  }

  return (
    <Box className="marquee">
      <Fragment>
        <Box className= "marquee-list">
          <Box className="marquee-list-1">
            <Box>
              <h2 className="marquee-list-title marquee-list-title-1">
                Desig
                <span className='marquee-list-span'>n</span> & Bu
                <span className='marquee-list-span'>i</span>ld
              </h2>
              <motion.div
                className="track"
                variants={marqueeForwards(17)}
                animate="animate"
              >
                {/* <h2>Where art meets engineering. Where art meets engineering.</h2> */}
                {words1.map((word, index) => (
                  <span key={index} className="word">
                    {word}{' '}
                  </span>
                ))}
              </motion.div>
            </Box>
            <motion.div
              className="track"
              variants={marqueeBackwards(15)}
              animate="animate"
            >
              {words1.map((word, index) => (
                <span key={index} className="word">
                  {word}{' '}
                </span>
              ))}
            </motion.div>
          </Box>
          <Box className="marquee-list-2">
            <Box>
              <h2 className="marquee-list-title marquee-list-title-2">
                Inno
                <span className='marquee-list-span'>v</span>ate & C
                <span className='marquee-list-span'>r</span>eate
              </h2>
              <motion.div
                className="track"
                variants={marqueeForwards(16)}
                animate="animate"
              >
                {/* <h2>Where art meets engineering. Where art meets engineering.</h2> */}
                {words2.map((word, index) => (
                  <span key={index} className="word">
                    {word}{' '}
                  </span>
                ))}
              </motion.div>
            </Box>
            <motion.div
              className="track"
              variants={marqueeBackwards(18)}
              animate="animate"
            >
              {words2.map((word, index) => (
                <span key={index} className="word">
                  {word}{' '}
                </span>
              ))}
            </motion.div>
          </Box>
          <Box className="marquee-list-3">
            <Box>
              <h2 className="marquee-list-title marquee-list-title-3">
                Cod
                <span className='marquee-list-span'>e</span> & A
                <span className='marquee-list-span'>r</span>t
              </h2>
              <motion.div
                className="track"
                variants={marqueeForwards(16)}
                animate="animate"
              >
                {/* <h2>Where art meets engineering. Where art meets engineering.</h2> */}
                {words3.map((word, index) => (
                  <span key={index} className="word">
                    {word}{' '}
                  </span>
                ))}
              </motion.div>
            </Box>
            <motion.div
              className="track"
              variants={marqueeBackwards(14)}
              animate="animate"
            >
              {words3.map((word, index) => (
                <span key={index} className="word">
                  {word}{' '}
                </span>
              ))}
            </motion.div>
          </Box>
        </Box>
        {/* <Box className="panel test"></Box> */}
      </Fragment>
    </Box>
  )
}

export default SectionMarquee

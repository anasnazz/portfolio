"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { Container, Box, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import CobeGlobe from "@CobeGlobe";

// Icons
import PublicIcon from '@mui/icons-material/Public'; 
import EmailIcon from '@mui/icons-material/Email';
import HandshakeIcon from '@mui/icons-material/Handshake';
import DashboardIcon from '@mui/icons-material/Dashboard';

const DEFAULT_PARTICLE_COUNT = 8;
const DEFAULT_GLOW_COLOR = "132, 0, 255"; 
const MOBILE_BREAKPOINT = 768;

// --- Data Structure ---
const cardData = [
  {
    id: "collab",
    area: "collab", 
    type: "collab",
    title: "COLLABORATION",
    content: "I prioritize client collaboration, fostering open communication"
  },
  {
    id: "tech",
    area: "tech",
    type: "tech",
    title: "Passionate about cutting-edge technologies",
  },
  {
    id: "globe",
    area: "globe",
    type: "globe",
    title: "I'm very flexible with time zone communications",
  },
  {
    id: "work",
    area: "work",
    type: "work",
    title: "Let's work together on your next project",
    email: "hello@mohdanast.com"
  },
  {
    id: "scoop",
    area: "scoop",
    type: "scoop",
    title: "THE INSIDE SCOOP",
    content: "Currently building a SaaS Application"
  }
];

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 4px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const ParticleCard = ({
  children,
  disableAnimations = false,
  sx = {},
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = true,
  url,
  gridArea, // New prop to handle grid placement
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => particle.parentNode?.removeChild(particle),
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, 
          { scale: 0, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 100);
      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
      element.style.setProperty('--opacity', '1');
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      element.style.setProperty('--opacity', '0');

      gsap.to(element, { 
        rotateX: 0, 
        rotateY: 0, 
        duration: 0.3, 
        ease: "power2.out" 
      });
    };

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      element.style.setProperty('--x', `${x}px`);
      element.style.setProperty('--y', `${y}px`);

      if (enableTilt) {
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -3; 
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 3;
        gsap.to(element, { rotateX, rotateY, duration: 0.1, ease: "power2.out", transformPerspective: 1000 });
      }
    };

    const handleClick = (e) => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y));
      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.3) 0%, rgba(${glowColor}, 0.1) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;
      element.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.6, ease: "power2.out", onComplete: () => ripple.remove() });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, clickEffect, glowColor]);

  const Wrapper = url ? Link : Box;
  const wrapperProps = url ? { href: url, target: "_blank" } : {};

  return (
    <Box
      ref={cardRef}
      component={Wrapper}
      {...wrapperProps}
      sx={{
        gridArea: gridArea, // Applied from prop
        position: "relative",
        overflow: "hidden",
        bgcolor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "24px",
        p: 3,
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        cursor: url ? "pointer" : "default",
        textDecoration: "none",
        color: "inherit",
        
        // --- Converted CSS Pseudo-elements & Hover States ---
        '&:hover': {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            borderColor: `rgba(${glowColor}, 0.5)`,
        },
        '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            padding: '2px',
            background: `radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(${glowColor}, 0.3) 0%, transparent 60%)`,
            borderRadius: 'inherit',
            // Mask composite logic for border glow
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none',
            opacity: 'var(--opacity, 0)',
            transition: 'opacity 0.3s ease',
            zIndex: 1,
        },
        ...sx
      }}
    >
      <Box 
        className="spotlight-overlay"
        sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(${glowColor}, 0.08), transparent 40%)`,
            opacity: 'var(--opacity, 0)',
            transition: 'opacity 0.3s ease',
            zIndex: 0,
        }} 
      />
      {children}
    </Box>
  );
};

// --- Sub-Components (Unchanged) ---
const CollabContent = ({ card }) => (
  <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', zIndex: 10, pointerEvents: 'none' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: '#9333ea', opacity: 0.8 }}>
      <HandshakeIcon fontSize="small" />
      <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1.5 }}>{card.title}</Typography>
    </Box>
    <Typography variant="h5" sx={{ fontWeight: 500, lineHeight: 1.2, color: '#1f2937' }}>
      {card.content}
    </Typography>
  </Box>
);

const TechContent = ({ card }) => (
  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center', zIndex: 10, pointerEvents: 'none' }}>
    <Typography variant="h5" sx={{ fontWeight: 500, lineHeight: 1.2, mb: 4, mt: 1, px: 2 }}>
      {card.title.split("technologies")[0]}
      <Box component="span" sx={{ color: '#9333ea', display: 'block' }}>technologies</Box>
    </Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 4 }}>
       {['Notion', 'Markdown', 'Node.js', 'Redis', 'Mongo', 'Prisma', 'Drizzle', 'Git', 'GitHub'].map(tag => (
          <Box key={tag} sx={{ px: 1, py: 0.5, bgcolor: '#f3f4f6', borderRadius: '6px', fontSize: '10px', fontWeight: 700, color: '#4b5563', border: '1px solid #e5e7eb' }}>
             {tag}
          </Box>
       ))}
    </Box>
    <Box sx={{ mt: 'auto', position: 'relative', width: '100%', height: 120, bgcolor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px 12px 0 0', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', gap: 0.5, p: 1, borderBottom: '1px solid #f3f4f6' }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#fca5a5' }} />
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#fde047' }} />
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#86efac' }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', pb: 3 }}>
            <Box textAlign="center">
                <Typography sx={{ fontSize: 10, fontWeight: 800, color: '#9ca3af', mb: 0.5 }}>Websites that</Typography>
                <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#9333ea' }}>Impact.</Typography>
            </Box>
        </Box>
    </Box>
  </Box>
);

const GlobeContent = ({ card }) => (
  <Box sx={{ 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    textAlign: 'center', 
    pt: 3, 
    zIndex: 10,
    position: 'relative'
  }}>
    <Typography variant="h6" sx={{ fontWeight: 500, mb: 1, pointerEvents: 'none' }}>
      I&apos;m very flexible with time<br/>
      <Box component="span" sx={{ color: '#9333ea' }}>zone communications</Box>
    </Typography>

    <Box sx={{ display: 'flex', gap: 1, mb: 2, pointerEvents: 'none' }}>
       {['🇬🇧 UK', '🇮🇳 India', '🇺🇸 USA'].map(country => (
         <Box key={country} sx={{ fontSize: '10px', fontWeight: 800, px: 1, py: 0.5, bgcolor: country.includes('India') ? '#f0fdf4' : '#f3f4f6', color: country.includes('India') ? '#15803d' : 'inherit', border: '1px solid', borderColor: country.includes('India') ? '#bbf7d0' : '#e5e7eb', borderRadius: 1 }}>
            {country}
         </Box>
       ))}
    </Box>

    <Box sx={{ 
      position: 'absolute', 
      bottom: '-50%', 
      width: '150%', 
      height: '450px', 
      display: 'flex', 
      justifyContent: 'center',
      pointerEvents: 'auto', 
      overflow: 'hidden'
    }}>
       <CobeGlobe />
    </Box>

    <Box sx={{ position: 'absolute', bottom: 16, left: 16, textAlign: 'left', pointerEvents: 'none', zIndex: 2 }}>
       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#9ca3af', fontSize: 10, fontWeight: 800 }}>
           <PublicIcon sx={{ fontSize: 12 }} /> REMOTE
       </Box>
       <Typography sx={{ fontSize: 14, fontWeight: 800, color: '#1f2937' }}>India</Typography>
    </Box>
  </Box>
);

// --- Main Section Component ---
const SectionBento = ({ glowColor = DEFAULT_GLOW_COLOR }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Container maxWidth={false} sx={{ maxWidth: "1170px", py: { xs: 6, md: 3 }, px: 2 }}>
      {/* MUI Grid Layout Replacement:
         Using Box with responsive grid props instead of vanilla CSS Grid + Media Queries 
      */}
      <Box sx={{
        display: 'grid',
        gap: '16px',
        // Responsive Columns
        gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr', // Matches min-width 600px
            lg: 'repeat(3, 1fr)' // Matches min-width 1024px ~ roughly lg breakpoint
        },
        // Responsive Rows (Only defined for Large to match specific pixel heights)
        gridTemplateRows: {
            lg: '240px 240px 180px' 
        },
        // Responsive Areas
        gridTemplateAreas: {
            xs: `
                "collab" 
                "tech" 
                "globe" 
                "scoop"
                "work" 
            `,
            sm: `
                "collab collab" 
                "tech tech" 
                "globe work" 
                "scoop scoop"
            `,
            lg: `
                "collab collab tech" 
                "globe work tech" 
                "globe scoop scoop"
            `
        }
      }}>
        {cardData.map((card) => (
          <ParticleCard 
            key={card.id} 
            gridArea={card.area} // Passing area to sx prop
            glowColor={glowColor}
            disableAnimations={isMobile}
          >
            {card.type === 'collab' && <CollabContent card={card} />}
            {card.type === 'tech' && <TechContent card={card} />}
            {card.type === 'globe' && <GlobeContent card={card} />}
            {card.type === 'work' && (
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>Let&apos;s work together<br/>on your next project</Typography>
                <MuiLink href={`mailto:${card.email}`} sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 1, bgcolor: '#000', color: '#fff', borderRadius: 2, fontSize: 12, fontWeight: 800, textDecoration: 'none', transition: 'background 0.2s', '&:hover': { bgcolor: '#333' } }}>
                   <EmailIcon sx={{ fontSize: 14 }} /> {card.email}
                </MuiLink>
              </Box>
            )}
            {card.type === 'scoop' && (
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', zIndex: 10 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#9ca3af', opacity: 0.6, mb: 1 }}>
                  <DashboardIcon fontSize="small" />
                  <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1 }}>{card.title}</Typography>
                </Box>
                <Typography sx={{ fontWeight: 500, color: '#374151' }}>{card.content}</Typography>
              </Box>
            )}
          </ParticleCard>
        ))}
      </Box>
    </Container>
  );
};

export default SectionBento;
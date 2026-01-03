"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { Container } from "@mui/material";
import Link from "next/link";

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
    email: "hello@anas.design"
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
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
  url,
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

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
    magnetismAnimationRef.current?.kill();
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
      // Reveal spotlight immediately on enter
      element.style.setProperty('--opacity', '1');
      
      if (enableTilt) {
        gsap.to(element, { rotateX: 2, rotateY: 2, duration: 0.3, ease: "power2.out", transformPerspective: 1000 });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      // Hide spotlight on leave
      element.style.setProperty('--opacity', '0');

      if (enableTilt) {
        gsap.to(element, { rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" });
      }
      if (enableMagnetism) {
        gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
      }
    };

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update CSS variables for the spotlight
      element.style.setProperty('--x', `${x}px`);
      element.style.setProperty('--y', `${y}px`);

      if (!enableTilt && !enableMagnetism) return;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -3; 
        const rotateY = ((x - centerX) / centerX) * 3;
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
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  const Wrapper = url ? Link : "div";
  const wrapperProps = url ? { href: url, target: "_blank" } : {};

  return (
    <Wrapper ref={cardRef} className={`${className} relative overflow-hidden group`} style={{ ...style, position: "relative", overflow: "hidden" }} {...wrapperProps}>
      {/* Spotlight Overlay Layer */}
      <div className="spotlight-overlay" />
      {children}
    </Wrapper>
  );
};

const BentoCardGrid = ({ children, gridRef }) => (
  <div className="bento-section w-full select-none relative" ref={gridRef}>
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
};

// --- Sub-Components ---
const CollabContent = ({ card }) => (
  <div className="flex flex-col justify-end h-full relative z-10 p-2 pointer-events-none">
    <div className="flex items-center gap-2 mb-3 text-purple-600 opacity-80">
      <HandshakeIcon fontSize="small" />
      <span className="text-[10px] font-bold uppercase tracking-widest">{card.title}</span>
    </div>
    <p className="text-xl font-medium leading-tight text-gray-800">
      {card.content}
    </p>
  </div>
);

const TechContent = ({ card }) => (
  <div className="flex flex-col h-full relative z-10 p-2 text-center pointer-events-none">
    <h3 className="text-xl font-medium leading-tight mb-8 mt-2 mx-auto max-w-[80%]">
      {card.title.split("technologies")[0]}
      <span className="text-purple-600 block">technologies</span>
    </h3>
    
    <div className="flex flex-wrap justify-center gap-2 mb-8">
       {['Notion', 'Markdown', 'Node.js', 'Redis', 'Mongo', 'Prisma', 'Drizzle', 'Git', 'GitHub'].map(tag => (
          <span key={tag} className="px-2 py-1 bg-gray-100 rounded-md text-[10px] font-bold text-gray-600 border border-gray-200">
             {tag}
          </span>
       ))}
    </div>

    <div className="mt-auto relative w-full h-32 bg-gray-50 border border-gray-200 rounded-t-xl overflow-hidden mx-auto shadow-sm">
        <div className="flex gap-1 p-2 border-b border-gray-100">
            <div className="w-1.5 h-1.5 rounded-full bg-red-300"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-300"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-300"></div>
        </div>
        <div className="flex items-center justify-center h-full pb-6">
            <div className="text-center">
                <span className="text-xs font-bold text-gray-400 block mb-1">Websites that</span>
                <span className="text-lg font-bold text-purple-600">Impact.</span>
            </div>
        </div>
    </div>
  </div>
);

const GlobeContent = ({ card }) => (
  <div className="flex flex-col items-center text-center h-full relative z-10 p-2 pt-6 pointer-events-none">
    <h3 className="text-lg font-medium leading-tight mb-4">
      I&apos;m very flexible with time<br/>
      <span className="text-purple-600">zone communications</span>
    </h3>
    
    <div className="flex gap-3 mb-8">
       <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded border border-gray-200">🇬🇧 UK</span>
       <span className="text-xs font-bold px-2 py-1 bg-green-50 text-green-700 rounded border border-green-200">🇮🇳 India</span>
       <span className="text-xs font-bold px-2 py-1 bg-gray-100 rounded border border-gray-200">🇺🇸 USA</span>
    </div>

    <div className="mt-auto relative w-full h-40 flex items-end justify-center overflow-hidden opacity-30">
       <PublicIcon sx={{ fontSize: 220, transform: 'translateY(60px)', color: '#8400ff' }} />
    </div>
    
    <div className="absolute bottom-4 left-4 text-left">
       <div className="flex items-center gap-1 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
           <PublicIcon sx={{ fontSize: 12 }} /> Remote
       </div>
       <div className="text-sm font-bold text-gray-800">India</div>
    </div>
  </div>
);

const WorkContent = ({ card }) => (
  <div className="flex flex-col items-center justify-center h-full relative z-10 p-2 text-center pointer-events-none">
    <h3 className="text-lg font-medium leading-tight mb-4">
        Let&apos;s work together<br/>on your next project
    </h3>
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-xs font-bold cursor-pointer pointer-events-auto hover:bg-gray-800 transition-all">
       <EmailIcon sx={{ fontSize: 14 }} /> {card.email}
    </div>
  </div>
);

const ScoopContent = ({ card }) => (
  <div className="flex flex-col justify-end h-full relative z-10 p-2 pointer-events-none">
    <div className="flex items-center gap-2 mb-1 text-gray-400 opacity-60">
       <DashboardIcon fontSize="small" />
       <span className="text-[10px] font-bold uppercase tracking-widest">{card.title}</span>
    </div>
    <p className="text-base font-medium text-gray-700">
       {card.content}
    </p>
  </div>
);

// --- Main Component ---

const SectionBento = ({
  enableStars = true,
  enableBorderGlow = true,
  disableAnimations = false,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1170px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: { xs: "3rem 20px", md: "1.5rem 20px" },
        zIndex: 0,
      }}
    >
      <style>
        {`
          .bento-section {
            --glow-color: ${glowColor};
            --border-color: #e5e7eb; 
            --background-card: #ffffff; 
            --text-main: #000000; 
            --text-secondary: #4b5563; 
          }
          
          /* CSS Grid Layout (Hydration Safe) */
          .card-grid {
            display: grid;
            grid-template-columns: 1fr;
            grid-auto-rows: minmax(200px, auto);
            gap: 16px;
            width: 100%;
            grid-template-areas:
              "collab"
              "tech"
              "globe"
              "work"
              "scoop";
          }
          
          @media (min-width: 1024px) {
            .card-grid {
              grid-template-columns: repeat(3, 1fr); 
              grid-template-rows: 240px 240px 180px; 
              gap: 20px;
              grid-template-areas: 
                "collab collab tech"
                "globe  work   tech"
                "globe  scoop  scoop";
            }
          }

          @media (min-width: 600px) and (max-width: 1023px) {
            .card-grid {
              grid-template-columns: 1fr 1fr;
              grid-auto-rows: minmax(220px, auto);
              grid-template-areas:
                "collab collab"
                "tech   tech"
                "globe  work"
                "scoop  scoop";
            }
          }

          .area-collab { grid-area: collab; }
          .area-tech   { grid-area: tech; }
          .area-globe  { grid-area: globe; }
          .area-work   { grid-area: work; }
          .area-scoop  { grid-area: scoop; }
          
          /* --- The Spotlight Effect --- */
          .spotlight-overlay {
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: radial-gradient(
              600px circle at var(--x, 50%) var(--y, 50%), 
              rgba(${glowColor}, 0.08), 
              transparent 40%
            );
            opacity: var(--opacity, 0);
            transition: opacity 0.3s ease;
            z-index: 0;
          }

          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px; 
            background: radial-gradient(400px circle at var(--x, 50%) var(--y, 50%),
                rgba(${glowColor}, 0.3) 0%,
                transparent 60%);
            border-radius: inherit;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
            opacity: var(--opacity, 0); /* Only show on hover */
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          .card--border-glow:hover {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); 
            border-color: rgba(${glowColor}, 0.5);
          }
        `}
      </style>

      <BentoCardGrid gridRef={gridRef}>
        <div className="card-grid">
          {cardData.map((card, index) => {
            const baseClassName = `card flex flex-col relative p-6 rounded-[24px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 area-${card.area} ${
              enableBorderGlow ? "card--border-glow" : ""
            }`;

            const cardStyle = {
               backgroundColor: "var(--background-card)",
               borderColor: "var(--border-color)",
               color: "var(--text-main)",
            };

            return (
              <ParticleCard
                key={index}
                className={baseClassName}
                style={cardStyle}
                disableAnimations={shouldDisableAnimations}
                particleCount={particleCount}
                glowColor={glowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
                url={card.url}
              >
                {/* Render Specific Content */}
                {card.type === 'collab' && <CollabContent card={card} />}
                {card.type === 'tech' && <TechContent card={card} />}
                {card.type === 'globe' && <GlobeContent card={card} />}
                {card.type === 'work' && <WorkContent card={card} />}
                {card.type === 'scoop' && <ScoopContent card={card} />}
              </ParticleCard>
            );
          })}
        </div>
      </BentoCardGrid>
    </Container>
  );
};

export default SectionBento;
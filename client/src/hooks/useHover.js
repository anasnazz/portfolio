// hooks/useHover.js
import { useState, useMemo } from 'react';

export const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Memoize handlers to prevent unnecessary re-renders
  const hoverProps = useMemo(() => ({
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  }), []);

  return { isHovered, hoverProps };
};
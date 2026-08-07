'use client';

import { useTheme, useMediaQuery } from '@mui/material';

export default function useBreakpoint() {
  const theme = useTheme();

  return {
    isXs: useMediaQuery(theme.breakpoints.only('xs')),
    isSm: useMediaQuery(theme.breakpoints.only('sm')),
    isMd: useMediaQuery(theme.breakpoints.only('md')),
    isLg: useMediaQuery(theme.breakpoints.only('lg')),
    isXl: useMediaQuery(theme.breakpoints.only('xl')),

    isSmDown: useMediaQuery(theme.breakpoints.down('sm')),
    isMdDown: useMediaQuery(theme.breakpoints.down('md')),
    isLgDown: useMediaQuery(theme.breakpoints.down('lg')),

    isSmUp: useMediaQuery(theme.breakpoints.up('sm')),
    isMdUp: useMediaQuery(theme.breakpoints.up('md')),
    isLgUp: useMediaQuery(theme.breakpoints.up('lg')),
  };
}

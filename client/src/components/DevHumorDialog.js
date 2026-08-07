'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Modal, 
  Button, 
  Fade, 
  Backdrop 
} from '@mui/material';
import { styled } from '@mui/material/styles';

// --- CSS-in-JS Styling ---

// The Main "Terminal" Window
const TerminalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)', // The irony: using CSS to center the joke about centering
  width: '90%',
  maxWidth: 450,
  backgroundColor: '#1e1e1e', // Dark terminal background
  border: '1px solid #333',
  borderRadius: '12px',
  boxShadow: '0px 20px 50px rgba(0,0,0,0.5)',
  outline: 'none',
  overflow: 'hidden',
  fontFamily: '"Fira Code", "Roboto Mono", monospace',
}));

// The Header Strip (Mac style)
const TerminalHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  backgroundColor: '#252526',
  borderBottom: '1px solid #333',
});

// The Traffic Light dots
const Dot = styled(Box)(({ color }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  marginRight: 8,
  backgroundColor: color,
}));

// The Content Area
const TerminalContent = styled(Box)({
  padding: '24px',
  color: '#d4d4d4', // VS Code default text color
});

// --- Logic ---

export default function DevHumorDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check localStorage to avoid annoying repeat visitors
    const hasSeen = localStorage.getItem('hasSeenCenterDivJoke');
    
    if (!hasSeen) {
      // Small delay to make it feel like the site is "loading"
      const timer = setTimeout(() => setOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('hasSeenCenterDivJoke', 'true');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          style: { backgroundColor: 'rgba(0, 0, 0, 0.6)' }
        },
      }}
    >
      <Fade in={open}>
        <TerminalBox>
          {/* Header with Traffic Lights */}
          <TerminalHeader>
            <Dot color="#ff5f56" onClick={handleClose} sx={{ cursor: 'pointer' }} /> {/* Red closes it */}
            <Dot color="#ffbd2e" />
            <Dot color="#27c93f" />
            <Typography 
              variant="caption" 
              sx={{ 
                ml: 'auto', 
                color: '#666', 
                fontFamily: 'monospace' 
              }}
            >
              css_debugger.exe
            </Typography>
          </TerminalHeader>

          {/* Body Content */}
          <TerminalContent>
            <Typography 
              variant="h6" 
              component="h2" 
              sx={{ 
                color: '#f48771', // Error Red color
                fontFamily: 'monospace', 
                fontWeight: 'bold',
                mb: 2 
              }}
            >
              Error 404: Center Not Found
            </Typography>

            <Typography 
              variant="body1" 
              sx={{ 
                fontFamily: 'monospace', 
                lineHeight: 1.6,
                mb: 3
              }}
            >
              We are currently trying to vertically center a div.
              <br />
              <Box component="span" sx={{ color: '#569cd6' }}>&gt; estimated_time:</Box>{' '}
              <Box component="span" sx={{ color: '#ce9178' }}>
                {/* FIXED: Replaced " with &quot; */}
                &quot;Between 5 minutes and 5 years&quot;
              </Box>
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                onClick={handleClose}
                sx={{
                  backgroundColor: '#0e639c', // VS Code Blue
                  textTransform: 'lowercase',
                  fontFamily: 'monospace',
                  '&:hover': { backgroundColor: '#1177bb' }
                }}
              >
                {/* FIXED: Replaced " with &quot; */}
                git commit -m &quot;ignore&quot;
              </Button>
            </Box>
          </TerminalContent>
        </TerminalBox>
      </Fade>
    </Modal>
  );
}
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  :root {
    /* Typography */
    --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    --font-family-display: 'FT Regola Neue', var(--font-family-base);
    --font-family-code: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;
    
    /* Font sizes */
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
    --font-size-4xl: 2.25rem;

    /* Line heights */
    --line-height-tight: 1.25;
    --line-height-base: 1.5;
    --line-height-relaxed: 1.75;

    /* Font weights */
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;

    /* Border radius */
    --radius-sm: 0.25rem;
    --radius-base: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-full: 9999px;
  }

  /* Animation keyframes */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes slideDown {
    from { transform: translateY(-10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes scaleIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    height: 100%;
    font-family: var(--font-family-base);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.background.primary};
    color: ${({ theme }) => theme.text.primary};
  }

  body {
    transition: background-color ${({ theme }) => theme.animations.transition.base},
                color ${({ theme }) => theme.animations.transition.base};
  }

  #root {
    height: 100%;
  }

  button {
    font-family: var(--font-family-base);
    transition: all ${({ theme }) => theme.animations.transition.base};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family-display);
    line-height: var(--line-height-tight);
    font-weight: var(--font-weight-semibold);
  }

  code {
    font-family: var(--font-family-code);
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Remove tap highlight on mobile */
  * {
    -webkit-tap-highlight-color: transparent;
  }

  /* Focus styles */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.text.accent};
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }

  :focus:not(:focus-visible) {
    outline: none;
  }

  /* Text selection */
  ::selection {
    background-color: ${({ theme }) => theme.text.accent + '40'};
    color: ${({ theme }) => theme.text.primary};
  }

  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.background.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.border.primary};
    border-radius: var(--radius-full);
    border: 2px solid ${({ theme }) => theme.background.secondary};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.text.secondary};
  }

  /* Improve text rendering */
  * {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`; 
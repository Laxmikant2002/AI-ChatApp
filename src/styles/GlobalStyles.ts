import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --font-size-base: 16px;
    --font-size-sm: 14px;
    --font-size-xs: 12px;
    --font-size-lg: 18px;
    --font-size-xl: 24px;
    --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    --font-family-code: 'Fira Code', Consolas, 'Courier New', monospace;
  }

  html {
    font-size: var(--font-size-base);
  }

  body {
    font-family: var(--font-family-base);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5f5f5;
    font-size: var(--font-size-base);
    line-height: 1.5;
  }

  code {
    font-family: var(--font-family-code);
    font-size: var(--font-size-sm);
  }

  h1 {
    font-size: var(--font-size-xl);
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: var(--font-size-lg);
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  #root {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
`; 
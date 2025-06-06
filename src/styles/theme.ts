export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    error: string;
    success: string;
    warning: string;
  };
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    accent: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    accent: string;
    white: string;
  };
  border: {
    primary: string;
    secondary: string;
    accent: string;
  };
  button: {
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
  };
  shadow: {
    light: string;
    medium: string;
    heavy: string;
  };
  animations: {
    transition: {
      base: string;
      fast: string;
      slow: string;
    };
    scale: {
      hover: string;
      tap: string;
    };
  };
  chat: {
    userBubble: string;
    assistantBubble: string;
    userText: string;
    assistantText: string;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    accent: '#FF2D55',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500'
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#F2F2F7',
    tertiary: '#E5E5EA',
    accent: '#007AFF'
  },
  text: {
    primary: '#000000',
    secondary: '#3C3C43',
    tertiary: '#787880',
    accent: '#007AFF',
    white: '#FFFFFF'
  },
  border: {
    primary: '#C6C6C8',
    secondary: '#E5E5EA',
    accent: '#007AFF'
  },
  button: {
    primary: '#007AFF',
    primaryHover: '#0051A8',
    secondary: '#5856D6',
    secondaryHover: '#3634A3'
  },
  shadow: {
    light: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.15)',
    heavy: '0 8px 16px rgba(0, 0, 0, 0.2)'
  },
  animations: {
    transition: {
      base: 'all 0.2s ease-in-out',
      fast: 'all 0.1s ease-in-out',
      slow: 'all 0.3s ease-in-out'
    },
    scale: {
      hover: 'scale(1.05)',
      tap: 'scale(0.95)'
    }
  },
  chat: {
    userBubble: '#007AFF',
    assistantBubble: '#F2F2F7',
    userText: '#FFFFFF',
    assistantText: '#000000'
  }
};

export const darkTheme: Theme = {
  colors: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    accent: '#FF375F',
    error: '#FF453A',
    success: '#32D74B',
    warning: '#FF9F0A'
  },
  background: {
    primary: '#000000',
    secondary: '#1C1C1E',
    tertiary: '#2C2C2E',
    accent: '#0A84FF'
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#EBEBF5',
    tertiary: '#8E8E93',
    accent: '#0A84FF',
    white: '#FFFFFF'
  },
  border: {
    primary: '#38383A',
    secondary: '#2C2C2E',
    accent: '#0A84FF'
  },
  button: {
    primary: '#0A84FF',
    primaryHover: '#0757A8',
    secondary: '#5E5CE6',
    secondaryHover: '#3634A3'
  },
  shadow: {
    light: '0 2px 4px rgba(0, 0, 0, 0.3)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.4)',
    heavy: '0 8px 16px rgba(0, 0, 0, 0.5)'
  },
  animations: {
    transition: {
      base: 'all 0.2s ease-in-out',
      fast: 'all 0.1s ease-in-out',
      slow: 'all 0.3s ease-in-out'
    },
    scale: {
      hover: 'scale(1.05)',
      tap: 'scale(0.95)'
    }
  },
  chat: {
    userBubble: '#0A84FF',
    assistantBubble: '#1C1C1E',
    userText: '#FFFFFF',
    assistantText: '#FFFFFF'
  }
};
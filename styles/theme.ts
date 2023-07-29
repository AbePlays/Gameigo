import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({
  colors: {
    'dark-bg-primary': '#030303',
    'dark-bg-secondary': '#1e1e1e',
    'light-bg-secondary': '#fefdfc',
    'light-bg-primary': '#f9f9f9',
    'dark-text': '#030304',
    'light-text': '#fafafa',
    'gradient-red': '#b92b27',
    'gradient-blue': '#1565C0',
    grey: '#eeeeee',
  },
  config,
  styles: {
    global: (props) => ({
      a: {
        textDecoration: 'none !important',
      },
      body: {
        bg: props.colorMode === 'dark' ? 'dark-bg-primary' : 'light-bg-primary',
        color: props.colorMode === 'dark' ? 'light-text' : 'dark-text',
      },
      h4: {
        fontSize: '24px !important',
      },
      h3: {
        margin: '8px 0',
        fontSize: '20px',
        fontWeight: 'bold',
      },
      '.adaptive-glass': {
        background: props.colorMode === 'dark' ? 'hsl(0 0% 30% / 50%)' : 'hsl(0 0% 100% / 50%)',
        backdropFilter: 'blur(30px)',
      },
    }),
  },
  fonts: {
    heading: 'Raleway',
    body: 'Raleway',
  },
});

export default theme;

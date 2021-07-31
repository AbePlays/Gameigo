import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

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
  },
  config,
  styles: {
    global: (props) => ({
      a: {
        textDecoration: 'none !important',
      },
      body: {
        bg: mode('light-bg-primary', 'dark-bg-primary')(props),
        color: mode('dark-text', 'light-text')(props),
      },
      h4: {
        fontSize: '24px !important',
      },
      h3: {
        margin: '8px 0',
        fontSize: '20px',
        fontWeight: 'bold',
      },
    }),
  },
  fonts: {
    heading: 'Raleway',
    body: 'Raleway',
  },
});

export default theme;

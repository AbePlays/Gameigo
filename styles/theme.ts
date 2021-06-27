import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      h4: {
        fontSize: '24px !important',
      },
      h3: {
        margin: '8px 0',
        fontSize: '20px',
        fontWeight: 'bold',
      },
    },
  },
  fonts: {
    heading: 'Raleway',
    body: 'Raleway',
  },
});

export default theme;

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
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

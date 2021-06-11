import { FunctionComponent } from 'react';
import { Box } from '@chakra-ui/layout';

const Layout: FunctionComponent = ({ children }) => {
  return (
    <Box maxW="container.xl" mx="auto" px="4" py="4">
      {children}
    </Box>
  );
};

export default Layout;

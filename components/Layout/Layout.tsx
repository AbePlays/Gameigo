import { Box } from '@chakra-ui/layout';
import { FunctionComponent } from 'react';

const Layout: FunctionComponent = ({ children }) => {
  return (
    <Box maxW="container.xl" mx="auto" px="4" py="4">
      {children}
    </Box>
  );
};

export default Layout;

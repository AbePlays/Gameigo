import { FunctionComponent } from 'react';
import { Box } from '@chakra-ui/layout';

const Layout: FunctionComponent = ({ children }) => {
  return (
    <Box maxW="1536px" mx="auto" bg="tomato">
      {children}
    </Box>
  );
};

export default Layout;

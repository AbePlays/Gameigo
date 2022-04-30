import { FunctionComponent } from 'react';
import { Box } from '@chakra-ui/react';

interface Props {
  children?: React.ReactNode;
}

const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <Box maxW="1536px" mx="auto">
      {children}
    </Box>
  );
};

export default Layout;

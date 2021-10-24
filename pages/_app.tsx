import { FunctionComponent, useState } from 'react';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { Box, ChakraProvider } from '@chakra-ui/react';

import Layout from '@components/Layout';
import Navbar from '@components/Navbar';
import { AuthProvider } from '@lib/auth';
import 'styles/loader.css';
import theme from 'styles/theme';

const MyApp: FunctionComponent<AppProps> = ({
  Component,
  pageProps,
  router,
}) => {
  const [showContent, setShowContent] = useState<boolean>(true);
  const { route } = router;

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Navbar setShowContent={setShowContent} />
        <Box display={showContent ? 'block' : 'none'}>
          <Layout>
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} key={route} />
            </AnimatePresence>
          </Layout>
        </Box>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;

import { FunctionComponent } from 'react';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { ChakraProvider } from '@chakra-ui/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Layout from '@components/Layout';
import Navbar from '@components/Navbar';
import { AuthProvider } from '@lib/auth';
import 'styles/global.css';
import theme from 'styles/theme';

const MyApp: FunctionComponent<AppProps> = ({
  Component,
  pageProps,
  router,
}) => {
  const { route } = router;

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Navbar />
        <Layout>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={route} />
          </AnimatePresence>
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;

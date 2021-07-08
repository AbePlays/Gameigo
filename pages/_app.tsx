import { FunctionComponent, useState } from 'react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { ChakraProvider } from '@chakra-ui/react';

import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import theme from '../styles/theme';
import { AuthProvider } from '../lib/auth';

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const [showContent, setShowContent] = useState<boolean>(true);

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Navbar setShowContent={setShowContent} />
        {showContent && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;

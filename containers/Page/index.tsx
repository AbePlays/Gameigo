import { FunctionComponent } from 'react';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';

interface Props {
  title: string;
}

const Page: FunctionComponent<Props> = ({ children, title }) => {
  return (
    <Box
      maxW="1120px"
      mx="auto"
      minH="calc(100vh - 64px)"
      px="4"
      py="12"
      bg="royalblue"
    >
      <Head>
        <title>Gameigo | {title}</title>
      </Head>
      <main>{children}</main>
    </Box>
  );
};

export default Page;

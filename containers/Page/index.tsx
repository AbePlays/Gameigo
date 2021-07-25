import { FunctionComponent } from 'react';
import Head from 'next/head';

import { MotionBox } from 'utils/MotionElements';

interface Props {
  title: string;
}

const Page: FunctionComponent<Props> = ({ children, title }) => {
  return (
    <MotionBox
      animate={{
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
      initial={{
        opacity: 0,
      }}
      maxW="1120px"
      minH="calc(100vh - 64px)"
      mx="auto"
      px="4"
      py="12"
    >
      <Head>
        <title>Gameigo | {title}</title>
      </Head>
      <main>{children}</main>
    </MotionBox>
  );
};

export default Page;

import { FunctionComponent } from 'react';
import Head from 'next/head';

import { MotionBox } from 'utils/MotionElements';
import { PageAnimation } from 'utils/animations';

interface Props {
  title: string;
}

const Page: FunctionComponent<Props> = ({ children, title }) => {
  return (
    <MotionBox
      variants={PageAnimation}
      initial="hidden"
      animate="show"
      exit="hidden"
      maxW="1120px"
      minH="calc(100vh - 56px)"
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

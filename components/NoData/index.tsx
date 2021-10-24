import { FunctionComponent } from 'react';
import Image from 'next/image';
import { Box, Heading, Text } from '@chakra-ui/react';

import notFound from 'public/images/notfound.png';

interface Props {
  [key: string]: string;
  title: string;
}

const NoData: FunctionComponent<Props> = ({ title, ...args }) => {
  return (
    <Box textAlign="center" {...args}>
      <Box position="relative" py="8">
        <Image
          alt="confused cat"
          height="300"
          width="330"
          placeholder="blur"
          src={notFound}
        />
      </Box>
      <Heading fontSize="xl">No Data Found!</Heading>
      <Text mt="4">{title}</Text>
    </Box>
  );
};

export default NoData;

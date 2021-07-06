import { FunctionComponent } from 'react';
import Image from 'next/image';
import { Box, Heading, Text } from '@chakra-ui/react';

interface Props {
  [key: string]: string;
  title: string;
}

const size = {
  height: 300,
  width: 300,
};

const NoData: FunctionComponent<Props> = ({ title, ...args }) => {
  return (
    <Box textAlign="center" {...args}>
      <Image
        src="/images/notfound.svg"
        height={size.height}
        width={size.width}
      />
      <Heading fontSize="xl">No Data Found!</Heading>
      <Text mt="4">{title}</Text>
    </Box>
  );
};

export default NoData;

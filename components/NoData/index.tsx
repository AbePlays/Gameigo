import { FunctionComponent } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

import notFound from 'public/images/notfound.png';
import BlurImage from '@components/BlurImage';

interface Props {
  [key: string]: string;
  title: string;
}

const NoData: FunctionComponent<Props> = ({ title, ...args }) => {
  return (
    <Box textAlign="center" {...args}>
      <Box position="relative" py="6">
        <BlurImage alt="" height="400" width="350" src={notFound} />
      </Box>
      <Heading fontSize="xl">No Data Found!</Heading>
      <Text mt="4">{title}</Text>
    </Box>
  );
};

export default NoData;

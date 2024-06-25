import BlurImage from '@components/BlurImage';
import { Box, Heading } from '@radix-ui/themes';
import notFound from 'public/images/notfound.png';

function NoData({ children }: { children?: React.ReactNode }) {
  return (
    <Box>
      <Box position="relative">
        <BlurImage alt="" className="mx-auto" height="400" width="350" src={notFound} />
      </Box>
      <Heading align="center">No Data Found!</Heading>
      {children}
    </Box>
  );
}

export { NoData };

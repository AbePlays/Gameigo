import { Box, Heading } from '@radix-ui/themes';

interface Props {
  children?: React.ReactNode;
  heading: string;
}

function AboutCard({ children, heading }: Props) {
  return (
    <Box>
      <Heading align="center" as="h2" className="uppercase !tracking-widest">
        {heading}
      </Heading>
      <Box className="h-2 mx-auto my-4 w-7 bg-[--gray-12] -rotate-10 -skew-10" />
      {children}
    </Box>
  );
}

export { AboutCard };

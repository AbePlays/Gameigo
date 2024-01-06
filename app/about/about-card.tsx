import { Heading } from '@radix-ui/themes';

interface Props {
  children?: React.ReactNode;
  heading: string;
}

function AboutCard({ children, heading }: Props) {
  return (
    <div>
      <Heading as="h2" className="text-center uppercase !tracking-widest">
        {heading}
      </Heading>
      <div className="h-2 mx-auto my-4 w-7 bg-black -rotate-10 -skew-10" />
      {children}
    </div>
  );
}

export { AboutCard };

import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import { Button, Link } from '@chakra-ui/react';

interface Props {
  name: string;
  url: string;
}

const Store: FunctionComponent<Props> = ({ name, url }) => {
  return (
    <Button>
      <NextLink href={`https://${url}`} passHref>
        <Link target="_blank">{name}</Link>
      </NextLink>
    </Button>
  );
};

export default Store;

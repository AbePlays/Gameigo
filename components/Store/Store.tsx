import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';

interface Props {
  name: string;
  url: string;
}

const Store: FunctionComponent<Props> = ({ name, url }) => {
  return (
    <NextLink href={`https://${url}`} passHref>
      <Link
        bg="dark-bg-secondary"
        fontWeight="medium"
        px="4"
        py="2"
        rounded="md"
        target="_blank"
        _hover={{ transform: 'scale(0.97)' }}
      >
        {name}
      </Link>
    </NextLink>
  );
};

export default Store;

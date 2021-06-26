import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';

interface Props {
  link: string;
  title: string;
}

const CustomLink: FunctionComponent<Props> = ({ link, title }) => {
  return (
    <NextLink href={link} passHref>
      <Link isExternal w="fit-content">
        {title}
      </Link>
    </NextLink>
  );
};

export default CustomLink;

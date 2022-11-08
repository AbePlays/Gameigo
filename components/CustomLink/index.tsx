import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';

interface Props {
  link: string;
  isExt?: boolean;
  onClick?: () => void;
  title: string;
  [key: string]: any;
}

const CustomLink: FunctionComponent<Props> = ({
  isExt = true,
  link,
  onClick = null,
  title,
  ...props
}) => {
  return (
    <NextLink href={link} legacyBehavior passHref>
      <Link isExternal={isExt} w="fit-content" onClick={onClick} {...props}>
        {title}
      </Link>
    </NextLink>
  );
};

export default CustomLink;

import { Link, LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';

interface Props extends LinkProps {
  link: string;
  isExt?: boolean;
  onClick?: () => void;
  title: string;
}

export default function CustomLink({ isExt = true, link, onClick = null, title, ...props }: Props) {
  return (
    <NextLink href={link} legacyBehavior passHref>
      <Link isExternal={isExt} w="fit-content" onClick={onClick} {...props}>
        {title}
      </Link>
    </NextLink>
  );
}

import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Link, useColorMode } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FunctionComponent } from 'react';

interface Props {
  name: string;
  url: string;
}

const Store: FunctionComponent<Props> = ({ name, url }) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <NextLink href={`https://${url}`} legacyBehavior passHref>
      <Link
        bg={isDarkMode ? 'light-bg-secondary' : 'dark-bg-secondary'}
        color={isDarkMode ? 'dark-text' : 'light-text'}
        display="flex"
        alignItems="center"
        fontWeight="medium"
        gap="2"
        px="4"
        py="2"
        rounded="md"
        target="_blank"
        _hover={{ transform: 'scale(0.97)' }}
      >
        <ExternalLinkIcon />
        {name}
      </Link>
    </NextLink>
  );
};

export default Store;

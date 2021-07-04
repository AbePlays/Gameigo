import { FunctionComponent, ReactNode } from 'react';
import { useColorMode, Button, Text } from '@chakra-ui/react';

interface BrandButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  title: string;
}

const BrandButton: FunctionComponent<BrandButtonProps> = ({
  icon,
  onClick,
  title,
}) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <Button
      bg={isDarkMode ? 'dark-bg-primary' : 'light-bg-secondary'}
      borderColor={isDarkMode ? 'light-text' : 'dark-text'}
      color={isDarkMode ? 'light-text' : 'dark-text'}
      h="12"
      justifyContent="flex-start"
      onClick={onClick}
      variant="outline"
      _hover={{
        transform: 'scale(0.99)',
      }}
    >
      {icon}
      <Text ml="8">{title}</Text>
    </Button>
  );
};

export default BrandButton;

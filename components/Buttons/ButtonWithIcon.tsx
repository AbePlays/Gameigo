import { FunctionComponent } from 'react';
import { useColorMode, Button, ButtonProps } from '@chakra-ui/react';

interface Props extends ButtonProps {
  icon?: React.ReactElement;
  onClick?: () => void;
  title: string;
}

const ButtonWithIcon: FunctionComponent<Props> = ({ icon = null, onClick, title, ...props }) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <Button
      bg={isDarkMode ? 'light-bg-secondary' : 'dark-bg-secondary'}
      color={isDarkMode ? 'dark-text' : 'light-text'}
      fontWeight="bold"
      onClick={onClick}
      rightIcon={icon}
      shadow="sm"
      _hover={{ transform: 'scale(0.99)' }}
      {...props}
    >
      {title}
    </Button>
  );
};

export default ButtonWithIcon;

import { FunctionComponent } from 'react';
import Image from 'next/image';
import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';

interface BrandButtonProps {
  imgSrc: string;
  title: string;
  onClick?: () => void;
}

const BrandButton: FunctionComponent<BrandButtonProps> = ({
  imgSrc,
  title,
  onClick,
}) => {
  return (
    <Button
      variant="outline"
      h="12"
      borderColor="black"
      justifyContent="flex-start"
      onClick={onClick}
    >
      <Image src={imgSrc} width="24" height="24" alt="brand logo" />
      <Text ml="8">{title}</Text>
    </Button>
  );
};

export default BrandButton;

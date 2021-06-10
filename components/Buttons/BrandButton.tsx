import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/layout';
import Image from 'next/image';
import { FunctionComponent } from 'react';

interface BrandButtonProps {
  imgSrc: string;
  title: string;
}

const BrandButton: FunctionComponent<BrandButtonProps> = ({
  imgSrc,
  title,
}) => {
  return (
    <Button
      variant="outline"
      h="12"
      borderColor="black"
      justifyContent="flex-start"
    >
      <Image src={imgSrc} width="24" height="24" alt="brand logo" />
      <Text ml="8">{title}</Text>
    </Button>
  );
};

export default BrandButton;

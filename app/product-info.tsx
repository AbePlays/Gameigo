import { Heading, Text } from '@radix-ui/themes';
import { StaticImageData } from 'next/image';

import BlurImage from '@components/BlurImage';

interface Props {
  content: string;
  src: StaticImageData;
  title: string;
}

function ProductInfo({ content, src, title }: Props) {
  // const { colorMode } = useColorMode();
  const colorMode: string = 'light';
  const isDarkMode = colorMode === 'dark';

  return (
    <div className="my-14 max-w-xl mx-auto space-y-4">
      <BlurImage alt="" className="mx-auto" src={src} height="300" width="500" />
      <Heading as="h3">{title}</Heading>
      <Text
        as="p"
        className={`${isDarkMode ? 'light-text' : 'dark-text'}`}
        size="4"
        style={{ textAlignLast: 'center' }}
      >
        {content}
      </Text>
    </div>
  );
}

export { ProductInfo };

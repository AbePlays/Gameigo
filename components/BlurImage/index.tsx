import Image, { ImageProps } from 'next/image';
import { FunctionComponent, useState } from 'react';

const BlurImage: FunctionComponent<ImageProps & { showBg?: boolean }> = ({
  alt = '',
  className,
  showBg = false,
  src,
  ...props
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <Image
      alt={alt}
      className={className}
      objectFit="cover"
      objectPosition="center"
      onLoadingComplete={() => setLoading(false)}
      placeholder={typeof src === 'string' ? 'empty' : 'blur'}
      src={src}
      style={{
        backgroundColor: showBg ? '#9ca3af' : 'transparent',
        filter: loading ? 'blur(40px) grayscale(100%)' : 'blur(0) grayscale(0)',
        scale: loading ? 1.1 : 1,
        transition: 'all 0.7s ease-in-out',
      }}
      {...props}
    />
  );
};

export default BlurImage;

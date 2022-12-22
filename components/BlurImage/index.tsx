import Image, { ImageProps } from 'next/image';
import { FunctionComponent, useState } from 'react';

const BlurImage: FunctionComponent<ImageProps & { showBg?: boolean }> = ({
  alt = '',
  className,
  showBg = false,
  src,
  style = {},
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const shouldBlur = typeof src === 'object' && loading;

  return (
    <Image
      alt={alt}
      className={className}
      onLoadingComplete={() => setLoading(false)}
      placeholder={shouldBlur ? 'blur' : 'empty'}
      src={src}
      style={{
        backgroundColor: showBg ? '#9ca3af' : 'transparent',
        filter: loading ? 'blur(15px) grayscale(100%)' : 'blur(0) grayscale(0)',
        objectFit: 'cover',
        objectPosition: 'center',
        scale: loading ? 1.1 : 1,
        transition: 'all 0.7s ease-in-out',
        ...style,
      }}
      {...props}
    />
  );
};

export default BlurImage;

import { FunctionComponent } from 'react';
import Head from 'next/head';

import { PageAnimation } from '@utils/animations';
import { MotionBox } from '@utils/MotionElements';

interface Props {
  description?: string;
  imageUrl?: string;
  maxWidth?: string;
  siteLink?: string;
  title: string;
  [key: string]: unknown;
}

const Page: FunctionComponent<Props> = ({
  children,
  description,
  imageUrl,
  maxWidth = '1120px',
  siteLink,
  title,
  ...props
}) => {
  return (
    <MotionBox
      variants={PageAnimation}
      initial="hidden"
      animate="show"
      // exit="hidden"
      maxWidth={maxWidth}
      minH="calc(100vh - 64px)"
      mx="auto"
      px="4"
      py="12"
      {...props}
    >
      <Head>
        <title>Gameigo | {title}</title>
        {description ? <meta name="description" content={description} /> : null}
        {imageUrl ? <meta name="image" content={imageUrl} /> : null}
        {siteLink ? (
          <link
            rel="canonical"
            href={`https://gameigo.vercel.app${siteLink}`}
          />
        ) : null}

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        {description ? (
          <meta property="og:description" content={description} />
        ) : null}
        {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
        {imageUrl ? (
          <meta property="og:image:secure_url" content={imageUrl} />
        ) : null}
        <meta property="og:type" content="website" />
        {siteLink ? (
          <meta
            property="og:url"
            content={`https://gameigo.vercel.app${siteLink}`}
          />
        ) : null}

        {/* Twitter */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
        {description ? (
          <meta name="twitter:description" content={description} />
        ) : null}
        {imageUrl ? <meta name="twitter:image:src" content={imageUrl} /> : null}
      </Head>
      <main>{children}</main>
    </MotionBox>
  );
};

export default Page;

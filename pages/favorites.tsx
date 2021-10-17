import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Heading, useColorMode, useToast } from '@chakra-ui/react';

import GameCard from '@components/GameCard';
import Loader from '@components/Loader';
import NoData from '@components/NoData';
import Page from '@containers/Page';
import { useAuth } from '@lib/auth';
import { FadeUpAnimation } from '@utils/animations';
import fetcher from '@utils/fetcher';
import { MotionSimpleGrid } from '@utils/MotionElements';
import { Routes } from 'routes';
import { Descriptions } from 'seo';

const Favorites: FunctionComponent = () => {
  const { user } = useAuth();
  const { colorMode } = useColorMode();
  const router = useRouter();
  const { data, error } = useSWR(
    user ? ['/api/favorites', user.uid] : null,
    fetcher
  );
  const toast = useToast();

  const isDarkMode = colorMode === 'dark';

  if (error) {
    console.error(error);
    toast({
      duration: 2000,
      isClosable: true,
      position: 'top-right',
      status: 'error',
      title: 'An error occured',
      variant: isDarkMode ? 'solid' : 'subtle',
    });
    router.replace(Routes.INDEX);
  }

  return (
    <Page title="Favorites" description={Descriptions.Favorites}>
      <Heading as="h1" fontSize={['4xl', '5xl', '6xl']}>
        Favorites
      </Heading>
      {!data ? (
        <Loader />
      ) : Array.isArray(data) && data.length > 0 ? (
        <MotionSimpleGrid
          animate="show"
          columns={[1, 2, 3]}
          initial="hidden"
          mt="8"
          spacingX={[4, 4, 6]}
          spacingY="6"
          variants={FadeUpAnimation.parent}
        >
          {data.map((game: Game) => (
            <GameCard game={game} key={game.id} />
          ))}
        </MotionSimpleGrid>
      ) : (
        <NoData title="Please add games to your collection." />
      )}
    </Page>
  );
};

export default Favorites;

'use client';

import { BookmarkFilledIcon, BookmarkIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import { useFormState } from 'react-dom';

import { GameDetail } from '@schemas/game';
import { toggleFavorite } from './actions';

export type FavoriteProps = {
  isFavorite: boolean;
  gameDetails: GameDetail;
  userId: string;
};

export default function Favorite(props: FavoriteProps) {
  const { isFavorite, gameDetails, userId } = props;
  const [, formAction] = useFormState(toggleFavorite, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="userId" value={userId} readOnly={true} />
      <input type="hidden" name="gameId" value={gameDetails.id} readOnly={true} />
      <input type="hidden" name="slug" value={gameDetails.slug} readOnly={true} />
      <Button aria-label="Favorite" title="Favorite" type="submit">
        {isFavorite ? <BookmarkFilledIcon /> : <BookmarkIcon />}
      </Button>
    </form>
  );
}

import { FunctionComponent } from 'react';
import { Heading } from '@chakra-ui/layout';

import { Game } from '../../types';

interface Props {
  game: Game;
}

const GameCard: FunctionComponent<Props> = ({ game }) => {
  return <Heading>{game.name}</Heading>;
};

export default GameCard;

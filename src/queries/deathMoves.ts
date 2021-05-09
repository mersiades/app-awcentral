import { gql } from '@apollo/client';
import { Move } from '../@types/staticDataInterfaces';

export interface DeathMovesData {
  deathMoves: Move[];
}

const DEATH_MOVES = gql`
  query DeathMoves {
    deathMoves {
      id
      name
      description
      playbook
      kind
    }
  }
`;

export default DEATH_MOVES;

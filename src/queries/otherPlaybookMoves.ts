import { gql, TypedDocumentNode } from '@apollo/client';
import { PlaybookType } from '../@types/enums';
import { Move } from '../@types/staticDataInterfaces';

export interface OtherPlaybookMovesData {
  otherPlaybookMoves: Move[];
}

export interface OtherPlaybookMovesVars {
  playbookType: PlaybookType;
}

const OTHER_PLAYBOOK_MOVES = gql`
  query OtherPlaybookMoves($playbookType: PlaybookType!) {
    otherPlaybookMoves(playbookType: $playbookType) {
      id
      name
      description
      playbook
      kind
    }
  }
` as TypedDocumentNode<OtherPlaybookMovesData, OtherPlaybookMovesVars>;

export default OTHER_PLAYBOOK_MOVES;

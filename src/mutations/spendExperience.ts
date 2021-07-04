import { gql } from '@apollo/client';
import { Character } from '../@types/dataInterfaces';
import { PlaybookType } from '../@types/enums';

export interface SpendExperienceData {
  spendExperience: {
    id: string;
    name: string;
    playbook: PlaybookType;
    experience: number;
    allowedImprovements: number;
    allowedPlaybookMoves: number;
    allowedOtherPlaybookMoves: number;
    __typename: 'Character';
  };
}

export interface SpendExperienceVars {
  gameRoleId: string;
  characterId: string;
}

export const spendExperienceOR = (
  character: Character
): SpendExperienceData => ({
  spendExperience: {
    id: character.id,
    name: character.name || 'temp-name',
    playbook: character.playbook,
    experience: character.experience - 5,
    allowedImprovements: character.allowedImprovements + 1,
    allowedPlaybookMoves: character.allowedPlaybookMoves,
    allowedOtherPlaybookMoves: character.allowedOtherPlaybookMoves,
    __typename: 'Character',
  },
});

const SPEND_EXPERIENCE = gql`
  mutation SpendExperience($gameRoleId: String!, $characterId: String!) {
    spendExperience(gameRoleId: $gameRoleId, characterId: $characterId) {
      id
      name
      playbook
      experience
      allowedImprovements
      allowedPlaybookMoves
      allowedOtherPlaybookMoves
    }
  }
`;

export default SPEND_EXPERIENCE;

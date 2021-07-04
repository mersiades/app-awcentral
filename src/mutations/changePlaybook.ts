import { gql } from '@apollo/client';
import { Character } from '../@types/dataInterfaces';
import { PlaybookType } from '../@types/enums';

export interface ChangePlaybookData {
  changePlaybook: {
    id: string;
    name: string;
    playbook: PlaybookType;
    mustChangePlaybook: boolean;
  };
}

export interface ChangePlaybookVars {
  gameRoleId: string;
  characterId: string;
  playbookType: PlaybookType;
}

export const getChangePlaybookOR = (
  character: Character,
  playbookType: PlaybookType
): ChangePlaybookData => {
  return {
    changePlaybook: {
      id: character.id,
      name: character.name || 'temp-name',
      playbook: playbookType,
      mustChangePlaybook: false,
    },
  };
};

const CHANGE_PLAYBOOK = gql`
  mutation ChangePlaybook(
    $gameRoleId: String!
    $characterId: String!
    $playbookType: PlaybookType!
  ) {
    changePlaybook(
      gameRoleId: $gameRoleId
      characterId: $characterId
      playbookType: $playbookType
    ) {
      id
      name
      playbook
      mustChangePlaybook
    }
  }
`;

export default CHANGE_PLAYBOOK;

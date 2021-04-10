import { gql } from '@apollo/client';
import { WorkspaceInput } from '../@types';
import { Character, PlaybookUnique, Workspace } from '../@types/dataInterfaces';
import { UniqueTypes } from '../@types/enums';
import { playbookUniqueFragments } from '../queries/game';

export interface SetWorkspaceData {
  setWorkspace: {
    id: string;
    playbookUnique: {
      id: string;
      type: UniqueTypes;
      workspace?: Workspace;
    };
    __typename?: 'Character';
  };
}

export interface SetWorkspaceVars {
  gameRoleId: string;
  characterId: string;
  workspace: WorkspaceInput;
}

export const getSetWorkspaceOR = (character: Character, workspaceInput: WorkspaceInput): SetWorkspaceData => {
  const optimisticPlaybookUnique: PlaybookUnique = {
    id: character.playbookUnique ? character.playbookUnique.id : 'temp-id-1',
    type: UniqueTypes.workspace,
    workspace: {
      ...workspaceInput,
      id: workspaceInput.id ? workspaceInput.id : 'temp-id-2',
      projects: character.playbookUnique?.workspace ? character.playbookUnique.workspace.projects : [],
      __typename: 'Workspace',
    },
    __typename: 'PlaybookUnique',
  };

  return {
    setWorkspace: {
      ...character,
      playbookUnique: optimisticPlaybookUnique,
      __typename: 'Character',
    },
  };
};

const SET_WORKSPACE = gql`
  mutation SetWorkspace($gameRoleId: String!, $characterId: String!, $workspace: WorkspaceInput!) {
    setWorkspace(gameRoleId: $gameRoleId, characterId: $characterId, workspace: $workspace) {
      id
      playbookUnique {
        id
        type
        ...Workspace
      }
    }
  }
  ${playbookUniqueFragments.workspace}
`;

export default SET_WORKSPACE;

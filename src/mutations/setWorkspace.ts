import { gql, TypedDocumentNode } from '@apollo/client';
import { WorkspaceInput } from '../@types';
import {
  Character,
  PlaybookUniques,
  Workspace,
} from '../@types/dataInterfaces';
import { UniqueTypes } from '../@types/enums';

export interface SetWorkspaceData {
  setWorkspace: {
    id: string;
    playbookUniques: {
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

export const getSetWorkspaceOR = (
  character: Character,
  workspaceInput: WorkspaceInput
): SetWorkspaceData => {
  const optimisticPlaybookUniques: PlaybookUniques = {
    id: character.playbookUniques ? character.playbookUniques.id : 'temp-id-1',
    type: UniqueTypes.workspace,
    workspace: {
      ...workspaceInput,
      id: workspaceInput.id ? workspaceInput.id : 'temp-id-2',
      uniqueType: UniqueTypes.workspace,
      projects: character.playbookUniques?.workspace
        ? character.playbookUniques.workspace.projects
        : [],
      __typename: 'Workspace',
    },
    __typename: 'PlaybookUniques',
  };

  return {
    setWorkspace: {
      ...character,
      playbookUniques: optimisticPlaybookUniques,
      __typename: 'Character',
    },
  };
};

const SET_WORKSPACE = gql`
  mutation SetWorkspace(
    $gameRoleId: String!
    $characterId: String!
    $workspace: WorkspaceInput!
  ) {
    setWorkspace(
      gameRoleId: $gameRoleId
      characterId: $characterId
      workspace: $workspace
    ) {
      id
      playbookUniques {
        id
        type
        workspace {
          id
          uniqueType
          workspaceInstructions
          projectInstructions
          itemsCount
          workspaceItems
          projects {
            id
            name
            notes
          }
        }
      }
    }
  }
` as TypedDocumentNode<SetWorkspaceData, SetWorkspaceVars>;

export default SET_WORKSPACE;

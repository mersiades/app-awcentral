import { gql, TypedDocumentNode } from '@apollo/client';
import { ProjectInput } from '../@types';
import { Character } from '../@types/dataInterfaces';

export interface RemoveProjectData {
  removeProject: Character;
  __typename?: 'Mutation';
}

export interface RemoveProjectVars {
  gameRoleId: string;
  characterId: string;
  project: ProjectInput;
}

const REMOVE_PROJECT = gql`
  mutation RemoveProject(
    $gameRoleId: String!
    $characterId: String!
    $project: ProjectInput!
  ) {
    removeProject(
      gameRoleId: $gameRoleId
      characterId: $characterId
      project: $project
    ) {
      id
      name
      playbook
      playbookUniques {
        id
        type
        workspace {
          id
          projects {
            id
            name
            notes
          }
        }
      }
    }
  }
` as TypedDocumentNode<RemoveProjectData, RemoveProjectVars>;

export default REMOVE_PROJECT;

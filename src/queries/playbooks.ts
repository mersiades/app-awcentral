import { gql, TypedDocumentNode } from '@apollo/client';
import { Playbook } from '../@types/staticDataInterfaces';
import { PlaybookVars } from './playbook';

export interface PlaybooksData {
  playbooks: Playbook[];
}

const PLAYBOOKS = gql`
  query Playbooks {
    playbooks {
      id
      playbookType
      barterInstructions
      intro
      introComment
      playbookImageUrl
    }
  }
` as TypedDocumentNode<PlaybooksData, PlaybookVars>;

export default PLAYBOOKS;

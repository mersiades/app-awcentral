import { gql, TypedDocumentNode } from '@apollo/client';
import { PlaybookType } from '../@types/enums';
import { Playbook } from '../@types/staticDataInterfaces';

export interface PlaybookData {
  playbook: Playbook;
}

export interface PlaybookVars {
  playbookType: PlaybookType;
}

const PLAYBOOK = gql`
  query Playbook($playbookType: PlaybookType!) {
    playbook(playbookType: $playbookType) {
      id
      playbookType
      barterInstructions
      intro
      introComment
      playbookImageUrl
    }
  }
` as TypedDocumentNode<PlaybookData, PlaybookVars>;

export default PLAYBOOK;

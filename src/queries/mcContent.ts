import { gql, TypedDocumentNode } from '@apollo/client';
import { McContent } from '../@types/staticDataInterfaces';

export interface McContentData {
  mcContent: McContent;
}

export interface McContentVars {}

const MC_CONTENT = gql`
  query McContent {
    mcContent {
      id
      firstSessionContent {
        id
        intro
        duringCharacterCreation {
          id
          title
          content
        }
        duringFirstSession {
          id
          title
          items
        }
        threatMapInstructions {
          id
          title
          content
        }
        afterFirstSession {
          id
          title
          items
        }
      }
      decisionMaking {
        id
        title
        content
      }
      core {
        id
        title
        items
      }
      harm {
        id
        title
        content
      }
      selected {
        id
        title
        content
      }
    }
  }
` as TypedDocumentNode<McContentData, McContentVars>;

export default MC_CONTENT;

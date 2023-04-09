import { gql, TypedDocumentNode } from '@apollo/client';
import { ThreatCreator } from '../@types/staticDataInterfaces';

export interface ThreatCreatorData {
  threatCreator: ThreatCreator;
}

export interface ThreatCreatorVars {}

const THREAT_CREATOR = gql`
  query ThreatCreator {
    threatCreator {
      id
      createThreatInstructions
      essentialThreatInstructions
      threatNames
      threats {
        id
        threatType
        impulses
        moves
      }
    }
  }
` as TypedDocumentNode<ThreatCreatorData, ThreatCreatorVars>;

export default THREAT_CREATOR;

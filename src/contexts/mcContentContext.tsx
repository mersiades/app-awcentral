import { createContext, FC, useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ContentItem, FirstSessionContent, TickerList } from '../@types/staticDataInterfaces';
import MC_CONTENT, { McContentData } from '../queries/mcContent';
import { useKeycloak } from '@react-keycloak/web';

interface IMcContentContext {
  firstSession?: FirstSessionContent;
  decisionMaking?: ContentItem;
  core?: TickerList[];
  harm?: ContentItem[];
  selected?: ContentItem[];
}

interface McContentProviderProps {
  children: JSX.Element;
}

const McContentContext = createContext<IMcContentContext>({});

export const useMcContent = () => useContext(McContentContext);

export const McContentConsumer = McContentContext.Consumer;

export const McContentProvider: FC<McContentProviderProps> = ({ children }) => {
  const [mcContent, setMcContent] = useState<IMcContentContext>({});

  // --------------------------------------------------3rd party hooks ----------------------------------------------------- //
  const { keycloak } = useKeycloak();

  // ------------------------------------------------------ graphQL -------------------------------------------------------- //
  const { data: mcContentData, loading } = useQuery<McContentData>(MC_CONTENT, { skip: !keycloak.authenticated });
  console.log(`mcContentData`, mcContentData);

  useEffect(() => {
    if (!!mcContentData) {
      const content = mcContentData.mcContent;
      setMcContent({
        ...mcContent,
        firstSession: content.firstSessionContent,
        decisionMaking: content.decisionMaking,
        core: content.core,
        harm: content.harm,
        selected: content.selected,
      });
    }
  }, [mcContentData]);
  console.log(`loading`, loading);

  return <McContentContext.Provider value={mcContent}>{children}</McContentContext.Provider>;
};

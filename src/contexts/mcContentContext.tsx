import { createContext, FC, useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';

import {
  ContentItem,
  FirstSessionContent,
  McContent,
  TickerList,
} from '../@types/staticDataInterfaces';
import MC_CONTENT, { McContentData } from '../queries/mcContent';

interface TickerItem {
  category: string;
  content: string;
}

interface IMcContentContext {
  firstSession?: FirstSessionContent;
  decisionMaking?: ContentItem;
  core?: TickerList[];
  harm?: ContentItem[];
  selected?: ContentItem[];
  tickerData?: TickerItem[];
}

interface McContentProviderProps {
  children: JSX.Element;
  injectedMcContent?: McContent;
}

const McContentContext = createContext<IMcContentContext>({});

export const useMcContent = () => useContext(McContentContext);

export const McContentConsumer = McContentContext.Consumer;

export const McContentProvider: FC<McContentProviderProps> = ({
  children,
  injectedMcContent = {},
}) => {
  const [mcContent, setMcContent] =
    useState<IMcContentContext>(injectedMcContent);

  // ----------------------------- 3rd party hooks ------------------------------- //
  const { isAuthenticated } = useAuth0();

  // ----------------------------- GraphQL -------------------------------------- //
  const { data: mcContentData } = useQuery<McContentData>(MC_CONTENT, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (!!mcContentData) {
      const content = mcContentData.mcContent;

      const tickerData = content.core
        .map((tickerList: TickerList) => {
          let array: TickerItem[] = [];

          tickerList.items.forEach((item) => {
            array = [...array, { category: tickerList.title, content: item }];
          });

          return array;
        })
        .flat();

      setMcContent({
        firstSession: content.firstSessionContent,
        decisionMaking: content.decisionMaking,
        core: content.core,
        harm: content.harm,
        selected: content.selected,
        tickerData,
      });
    }
  }, [mcContentData]);

  return (
    <McContentContext.Provider value={mcContent}>
      {children}
    </McContentContext.Provider>
  );
};

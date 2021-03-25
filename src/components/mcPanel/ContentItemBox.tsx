import { FC, useState } from 'react';
import { Box } from 'grommet';
import { FormUp, FormDown } from 'grommet-icons';

import { StyledMarkdown } from '../styledComponents';
import { HeadingWS } from '../../config/grommetConfig';
import { ContentItem } from '../../@types/staticDataInterfaces';
import { useFonts } from '../../contexts/fontContext';

interface ContentItemBoxProps {
  contentItem: ContentItem;
}

const ContentItemBox: FC<ContentItemBoxProps> = ({ contentItem }) => {
  // -------------------------------------------------- Component state ---------------------------------------------------- //
  const [showDetails, setShowDetails] = useState<string>('');

  // ------------------------------------------------------- Hooks --------------------------------------------------------- //
  const { crustReady } = useFonts();

  // ------------------------------------------------- Component functions -------------------------------------------------- //
  const toggleShowDetails = (id: string) => (showDetails === id ? setShowDetails('') : setShowDetails(id));

  // -------------------------------------------------- Render component --------------------------------------------------- //
  return (
    <>
      <Box fill="horizontal" direction="row" justify="between" align="center">
        <Box direction="row" justify="start" align="center" pad="12px" gap="12px">
          {showDetails.includes(contentItem.id) ? (
            <FormUp
              data-testid="hide-move-details-icon"
              onClick={() => toggleShowDetails(contentItem.id)}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <FormDown
              data-testid="show-move-details-icon"
              onClick={() => toggleShowDetails(contentItem.id)}
              style={{ cursor: 'pointer' }}
            />
          )}
          <HeadingWS
            crustReady={crustReady}
            level="3"
            margin={{ top: '3px', bottom: '3px' }}
            onClick={() => toggleShowDetails(contentItem.id)}
            style={{ cursor: 'pointer' }}
          >
            {contentItem.title}
          </HeadingWS>
        </Box>
      </Box>
      {showDetails.includes(contentItem.id) && (
        <Box pad="12px" animation={{ type: 'fadeIn', delay: 0, duration: 500, size: 'xsmall' }}>
          <StyledMarkdown>{contentItem.content}</StyledMarkdown>
        </Box>
      )}
    </>
  );
};

export default ContentItemBox;

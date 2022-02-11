import React, { FC, useEffect, useState } from 'react';
import { Box } from 'grommet';
import { FormUp, FormDown, Edit } from 'grommet-icons';

import { StyledMarkdown } from '../styledComponents';
import { HeadingWS, TextWS } from '../../config/grommetConfig';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import { getCharacterNameString } from '../../helpers/getCharacterNameString';

interface NameAndLooksBoxProps {
  description?: string;
  navigateToCharacterCreation: (step: string) => void;
}

const NameAndLooksBox: FC<NameAndLooksBoxProps> = ({
  description,
  navigateToCharacterCreation,
}) => {
  // ----------------------------- Component state ------------------------------ //
  const [showDescription, setShowDescription] = useState(false);
  const [looksString, setLooksString] = useState('');
  const [name, setName] = useState('');

  // ----------------------------- Hooks ---------------------------------------- //
  const { crustReady } = useFonts();
  const { character } = useGame();

  // ----------------------------- Component functions ------------------------- //

  // ----------------------------- Effects ---------------------------------------- //
  useEffect(() => {
    if (!!character) {
      const looksLooks = character?.looks.map((look) => look.look) || [];
      setLooksString(looksLooks.join(', '));
      let nameString = getCharacterNameString(character);

      setName(nameString);
    }
  }, [character]);

  // ----------------------------- Render ---------------------------------------- //
  return (
    <Box
      data-testid="name-looks-box"
      fill="horizontal"
      align="center"
      justify="start"
      style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.25)' }}
    >
      <Box
        fill="horizontal"
        direction="row"
        justify="between"
        align="center"
        pad={{ vertical: '12px' }}
      >
        <Box justify="center" pad={{ vertical: '12px' }}>
          <HeadingWS crustReady={crustReady} level="2" margin="0px">
            {name}
          </HeadingWS>
          <TextWS>{looksString}</TextWS>
        </Box>
        <Box direction="row" align="center" gap="12px">
          {showDescription ? (
            <FormUp
              data-testid="name-up-chevron"
              onClick={() => setShowDescription(false)}
            />
          ) : (
            <FormDown
              data-testid="name-down-chevron"
              onClick={() => setShowDescription(true)}
            />
          )}
          <Edit
            color="accent-1"
            onClick={() => navigateToCharacterCreation('1')}
            style={{ cursor: 'pointer' }}
          />
        </Box>
      </Box>
      {showDescription && !!description && (
        <Box
          fill="horizontal"
          pad="12px"
          animation={{
            type: 'fadeIn',
            delay: 0,
            duration: 500,
            size: 'xsmall',
          }}
        >
          <StyledMarkdown>{description}</StyledMarkdown>
        </Box>
      )}
    </Box>
  );
};
export default NameAndLooksBox;

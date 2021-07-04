import React, { FC } from 'react';
import { Anchor, Box } from 'grommet';

import { TextWS } from '../config/grommetConfig';
import {
  SCRIPT_CHANGE_ATTRIBUTION_TEXT_1,
  SCRIPT_CHANGE_ATTRIBUTION_TEXT_2,
  SCRIPT_CHANGE_ATTRIBUTION_TEXT_3,
  SCRIPT_CHANGE_ATTRIBUTION_TEXT_4,
} from '../config/constants';

const ScriptChangeAttribution: FC = () => (
  <Box flex="grow">
    <TextWS>
      {SCRIPT_CHANGE_ATTRIBUTION_TEXT_1}
      <strong>
        <em>{SCRIPT_CHANGE_ATTRIBUTION_TEXT_2}</em>
      </strong>
      {SCRIPT_CHANGE_ATTRIBUTION_TEXT_3}
      <Anchor
        href="http://briebeau.com/scriptchange"
        target="_blank"
        rel="noopener noreferrer"
      >
        {SCRIPT_CHANGE_ATTRIBUTION_TEXT_4}
      </Anchor>
      .
    </TextWS>
  </Box>
);

export default ScriptChangeAttribution;

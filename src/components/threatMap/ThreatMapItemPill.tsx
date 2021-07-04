import React, { FC } from 'react';
import { Box, Text } from 'grommet';
import { Pan } from 'grommet-icons';

import { ThreatMapItem } from './ThreatMapData';

interface ThreatMapItemPillProps {
  item: ThreatMapItem;
}

const ThreatMapItemPill: FC<ThreatMapItemPillProps> = ({ item }) => {
  return (
    <Box
      direction="row"
      background={'#4C684C'}
      round="medium"
      margin={{ vertical: '3px', horizontal: '3px' }}
      pad={{ horizontal: '9px' }}
      justify="between"
      align="center"
      onClick={() => {}}
      hoverIndicator={{ color: '#698D70', dark: true }}
      style={{ zIndex: 10, width: 'fit-content' }}
      gap="6px"
    >
      <Pan color="white" size="14px" a11yTitle={`${item.label}-movable-pill`} />
      <Text size="small" style={{ paddingTop: '2px' }}>
        {item.label}
      </Text>
    </Box>
  );
};

export default ThreatMapItemPill;

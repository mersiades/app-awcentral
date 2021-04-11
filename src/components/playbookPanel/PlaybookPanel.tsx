import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { Box } from 'grommet';

import StatsBox from './StatsBox';
import MovesBox from './MovesBox';
import NameAndLooksBox from './NameAndLooksBox';
import BarterBox from './BarterBox';
import GearBox from './GearBox';
import HxBox from './HxBox';
import HarmBox from './HarmBox';
import AngelKitBox from './AngelKitBox';
import VehiclesBox from './VehiclesBox';
import GangBox from './GangBox';
import UniqueItemsBox from './UniqueItemsBox';
import HoldingBox from './HoldingBox';
import FollowersBox from './FollowersBox';
import SkinnerGearBox from './SkinnerGearBox';
import BattleVehiclesBox from './BattleVehiclesBox';
import EstablishmentBox from './EstablishmentBox';
import WorkshopBox from './WorkshopBox';
import PLAYBOOK, { PlaybookData, PlaybookVars } from '../../queries/playbook';
import { MoveType } from '../../@types/enums';
import { Character } from '../../@types/dataInterfaces';
import { CharacterMove, Move } from '../../@types/staticDataInterfaces';
import { decapitalize } from '../../helpers/decapitalize';
import ImprovementBox from './ImprovementBox';

interface PlaybookPanelProps {
  character: Character;
  navigateToCharacterCreation: (step: string) => void;
  openDialog: (move: Move | CharacterMove) => void;
}

const PlaybookPanel: FC<PlaybookPanelProps> = ({ character, navigateToCharacterCreation, openDialog }) => {
  const { data } = useQuery<PlaybookData, PlaybookVars>(PLAYBOOK, { variables: { playbookType: character.playbook } });

  return (
    <Box data-testid="character-sheet" direction="row" wrap pad="12px" overflow="auto">
      <NameAndLooksBox
        name={character.name ? character.name : ''}
        playbook={decapitalize(character.playbook)}
        description={data?.playbook.intro}
        looks={character.looks}
        navigateToCharacterCreation={navigateToCharacterCreation}
      />

      <StatsBox navigateToCharacterCreation={navigateToCharacterCreation} />

      {character.characterMoves.length > 0 && (
        <MovesBox
          moves={character.characterMoves}
          open
          moveCategory={MoveType.character}
          navigateToCharacterCreation={navigateToCharacterCreation}
          openDialog={openDialog}
        />
      )}

      <HarmBox />

      <HxBox navigateToCharacterCreation={navigateToCharacterCreation} />

      <GearBox gear={character.gear} navigateToCharacterCreation={navigateToCharacterCreation} />

      {data?.playbook.barterInstructions && <BarterBox />}
      {!!character.playbookUnique?.angelKit && (
        <AngelKitBox
          angelKit={character.playbookUnique.angelKit}
          navigateToCharacterCreation={navigateToCharacterCreation}
          openDialog={openDialog}
        />
      )}
      {!!character.playbookUnique?.brainerGear && (
        <UniqueItemsBox
          title="Brainer gear"
          items={character.playbookUnique.brainerGear.brainerGear.map((item) => item.substring(0, item.indexOf(')_') + 1))}
          navigateToCharacterCreation={navigateToCharacterCreation}
        />
      )}
      {!!character.playbookUnique?.customWeapons && (
        <UniqueItemsBox
          title="Custom weapons"
          items={character.playbookUnique.customWeapons.weapons}
          navigateToCharacterCreation={navigateToCharacterCreation}
        />
      )}

      {!!character.playbookUnique?.establishment && (
        <EstablishmentBox navigateToCharacterCreation={navigateToCharacterCreation} />
      )}
      {!!character.playbookUnique?.followers && <FollowersBox navigateToCharacterCreation={navigateToCharacterCreation} />}
      {!!character.playbookUnique?.gang && (
        <GangBox navigateToCharacterCreation={navigateToCharacterCreation} openDialog={openDialog} />
      )}
      {!!character.playbookUnique?.holding && <HoldingBox navigateToCharacterCreation={navigateToCharacterCreation} />}

      {!!character.playbookUnique?.skinnerGear && (
        <SkinnerGearBox navigateToCharacterCreation={navigateToCharacterCreation} />
      )}
      {!!character.playbookUnique?.weapons && (
        <UniqueItemsBox
          title="Weapons"
          items={character.playbookUnique.weapons.weapons}
          navigateToCharacterCreation={navigateToCharacterCreation}
        />
      )}
      {!!character.playbookUnique?.workspace && <WorkshopBox navigateToCharacterCreation={navigateToCharacterCreation} />}

      <VehiclesBox vehicles={character.vehicles} navigateToCharacterCreation={navigateToCharacterCreation} />
      <BattleVehiclesBox vehicles={character.battleVehicles} navigateToCharacterCreation={navigateToCharacterCreation} />
      <ImprovementBox />
    </Box>
  );
};

export default PlaybookPanel;

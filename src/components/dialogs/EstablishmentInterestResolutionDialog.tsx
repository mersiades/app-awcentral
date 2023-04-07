import React, { FC, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Select } from 'grommet';

import DialogWrapper from '../DialogWrapper';
import {
  HeadingWS,
  ButtonWS,
  npcDialogBackground,
} from '../../config/grommetConfig';
import { useFonts } from '../../contexts/fontContext';
import { useGame } from '../../contexts/gameContext';
import RESOLVE_ESTABLISHMENT_INTEREST, {
  getResolveEstablishmentInterestOR,
  ResolveEstablishmentInterestData,
  ResolveEstablishmentInterestVars,
} from '../../mutations/resolveEstablishmentInterest';

export const RESOLVE_INTEREST_DIALOG_TITLE = 'Which interest will you resolve?';
export const RESOLVE_INTEREST_SELECT_LABEL = 'select-interest-input';

interface EstablishmentInterestResolutionDialogProps {
  wantsInOnIt: string;
  oweForIt: string;
  wantsItGone: string;
}

interface Interests {
  wantsInOnIt: string;
  oweForIt: string;
  wantsItGone: string;
}

const EstablishmentInterestResolutionDialog: FC<EstablishmentInterestResolutionDialogProps> =
  ({ wantsInOnIt, oweForIt, wantsItGone }) => {
    // ----------------------------- Component state ------------------------ //
    const [interests, setInterests] = useState<Interests>({
      wantsInOnIt,
      oweForIt,
      wantsItGone,
    });

    // ----------------------------- Hooks ---------------------------------- //
    const { crustReady } = useFonts();
    const { userGameRole, character } = useGame();

    // ----------------------------- GraphQL -------------------------------- //
    const [resolveInterest, { loading: resolvingInterest }] = useMutation<
      ResolveEstablishmentInterestData,
      ResolveEstablishmentInterestVars
    >(RESOLVE_ESTABLISHMENT_INTEREST);

    // ----------------------------- Component functions -------------------- //
    const options: { label: string; value: string }[] = [
      { label: `${wantsInOnIt} wants in on it`, value: wantsInOnIt },
      { label: `You owe ${oweForIt} for it`, value: oweForIt },
      { label: `${wantsItGone} wants it gone`, value: wantsItGone },
    ];

    const handleSelectInterest = (selectedInterested: string) => {
      setInterests({
        wantsInOnIt: selectedInterested === wantsInOnIt ? '' : wantsInOnIt,
        oweForIt: selectedInterested === oweForIt ? '' : oweForIt,
        wantsItGone: selectedInterested === wantsItGone ? '' : wantsItGone,
      });
    };
    const getIsReady = () => {
      let count = 0;

      if (interests.wantsInOnIt) {
        count++;
      }

      if (interests.oweForIt) {
        count++;
      }

      if (interests.wantsItGone) {
        count++;
      }

      return count === 2;
    };

    const handleResolve = async () => {
      if (!!userGameRole && !!character && !character.isDead) {
        try {
          await resolveInterest({
            variables: {
              gameRoleId: userGameRole.id,
              characterId: character.id,
              oweForIt: interests.oweForIt,
              wantsInOnIt: interests.wantsInOnIt,
              wantsItGone: interests.wantsItGone,
            },
            optimisticResponse: getResolveEstablishmentInterestOR(
              character,
              interests.oweForIt,
              interests.wantsInOnIt,
              interests.wantsItGone
            ),
          });
        } catch (error) {
          console.error(error);
        }
      }
    };

    // ----------------------------- Render --------------------------------- //
    return (
      <DialogWrapper background={npcDialogBackground} handleClose={() => {}}>
        <Box gap="12px">
          <HeadingWS crustReady={crustReady} level={4} alignSelf="start">
            {RESOLVE_INTEREST_DIALOG_TITLE}
          </HeadingWS>
          <Box fill align="start" justify="start">
            <Select
              id="interest-input"
              aria-label={RESOLVE_INTEREST_SELECT_LABEL}
              name="interest"
              placeholder="Which?"
              options={options}
              labelKey={'label'}
              valueKey={'value'}
              onChange={(e) => handleSelectInterest(e.value.value)}
            />
          </Box>
          <Box fill="horizontal" direction="row" justify="end" gap="small">
            <ButtonWS
              label="RESOLVE"
              primary
              onClick={() =>
                !resolvingInterest && getIsReady() && handleResolve()
              }
              disabled={!getIsReady() || resolvingInterest}
            />
          </Box>
        </Box>
      </DialogWrapper>
    );
  };

export default EstablishmentInterestResolutionDialog;

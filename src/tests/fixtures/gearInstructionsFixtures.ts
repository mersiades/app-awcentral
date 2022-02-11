import { GearInstructions } from '../../@types/staticDataInterfaces';

export const mockgearInstructionsDefault: GearInstructions = {
  id: 'default-gear-instructions-id',
  gearIntro: 'You get:',
  youGetItems: [
    'fashion suitable to your look, including at your option a piece worth 1-armor (you detail)',
  ],
  introduceChoice: '',
  numberCanChoose: 0,
  chooseableGear: [],
  withMC:
    'If you’d like to start play with a vehicle or a prosthetic, get with the MC.',
  startingBarter: 2,
  __typename: 'GearInstructions',
};

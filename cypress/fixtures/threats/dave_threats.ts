import { Threat } from '../../../src/@types/dataInterfaces';
import { ThreatType } from '../../../src/@types/enums';

export const mockTumTum: Threat = {
  id: '60aa0c7e7847de0f0ba54ed7',
  name: 'Tum Tum',
  threatKind: 'WARLORD' as ThreatType,
  impulse: 'Slaver (to own or sell people)',
  description:
    'consectetur adipiscing elit. Cras semper augue est, vel consequat dolor volutpat in',
  stakes:
    'Maecenas vitae consequat justo, quis sollicitudin nulla. Phasellus pulvinar nunc eget mauris tristique, ut aliquam felis mattis. Nulla ultricies feugiat arcu non facilisis.',
  __typename: 'Threat',
};

export const mockGnarly: Threat = {
  id: '60aa0c7e7847de0f0ba54ed8',
  name: 'Gnarly',
  threatKind: 'GROTESQUE' as ThreatType,
  impulse: 'Cannibal (craves satiety and plenty)',
  description:
    'Maecenas tempus ac felis at sollicitudin. Etiam pulvinar, nibh eget fringilla pretium, sem sem ultricies augue, vitae condimentum enim nibh nec mi.',
  stakes: undefined,
  __typename: 'Threat',
};

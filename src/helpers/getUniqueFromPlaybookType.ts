import { PlaybookType } from '../@types/enums';

export const getUniqueFromPlaybookType = (playbookType: PlaybookType) => {
  switch (playbookType) {
    case PlaybookType.angel:
      return 'Angel kit';
    case PlaybookType.battlebabe:
      return 'Custom weapons';
    case PlaybookType.brainer:
      return 'Brainer gear';
    case PlaybookType.chopper:
      return 'Gang';
    case PlaybookType.driver:
      return '[nothing]';
    case PlaybookType.gunlugger:
      return 'Weapons';
    case PlaybookType.hardholder:
      return 'Holding';
    case PlaybookType.hocus:
      return 'Followers';
    case PlaybookType.maestroD:
      return 'Establishment';
    case PlaybookType.savvyhead:
      return 'Workspace';
    case PlaybookType.skinner:
      return 'Skinner gear';

    default:
      break;
  }
};

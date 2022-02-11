import { PlaybookType } from '../../@types/enums';
import { getUniqueFromPlaybookType } from '../getUniqueFromPlaybookType';

describe('Generating uniques based on Playbook types', () => {
  test('should return an AngelKit', () => {
    const result = getUniqueFromPlaybookType(PlaybookType.angel);
    expect(result).toEqual('Angel kit');
  });

  test('should return CustomWeapons', () => {
    const result = getUniqueFromPlaybookType(PlaybookType.battlebabe);
    expect(result).toEqual('Custom weapons');
  });

  test('should return Brainer Gear', () => {
    const result = getUniqueFromPlaybookType(PlaybookType.brainer);
    expect(result).toEqual('Brainer gear');
  });

  test('should return a Gang', () => {
    const result = getUniqueFromPlaybookType(PlaybookType.chopper);
    expect(result).toEqual('Gang');
  });

  test('should return nothing for a Driver', () => {
    const result = getUniqueFromPlaybookType(PlaybookType.driver);
    expect(result).toEqual('[nothing]');
  });

  test('should return Weapons', () => {
    const result = getUniqueFromPlaybookType(PlaybookType.gunlugger);
    expect(result).toEqual('Weapons');
  });

  test('should return a Holding', () => {
    const result = getUniqueFromPlaybookType(PlaybookType.hardholder);
    expect(result).toEqual('Holding');
  });

  test('should return Followeres', () => {
    const result = getUniqueFromPlaybookType(PlaybookType.hocus);
    expect(result).toEqual('Followers');
  });

  test('should return an Establishment', () => {
    const result = getUniqueFromPlaybookType(PlaybookType.maestroD);
    expect(result).toEqual('Establishment');
  });

  test('should return a Workspace', () => {
    const result = getUniqueFromPlaybookType(PlaybookType.savvyhead);
    expect(result).toEqual('Workspace');
  });

  test('should return SkinnerGear', () => {
    const result = getUniqueFromPlaybookType(PlaybookType.skinner);
    expect(result).toEqual('Skinner gear');
  });
});

import { getFollowersDescription } from '../getFollowersDescription';

describe('Generating descriptions for followers', () => {
  const characterization = 'your cult';
  const followers = 20;
  const travelOption = 'travel with you';

  test('should description when no characterization, no followers and no travelOption', () => {
    const result = getFollowersDescription(undefined, undefined, undefined);
    expect(result).toEqual('');
  });

  test('should description when characterization but no followers and no travelOption', () => {
    const result = getFollowersDescription(
      characterization,
      undefined,
      undefined
    );
    expect(result).toEqual('Your cult');
  });

  test('should description when characterization and followers but no travelOption', () => {
    const result = getFollowersDescription(
      characterization,
      followers,
      undefined
    );
    expect(result).toEqual('Your cult is about 20 followers.');
  });

  test('should description when followers but no travelOption and no characterization', () => {
    const result = getFollowersDescription(undefined, followers, undefined);
    expect(result).toEqual('You have about 20 followers.');
  });

  test('should description when followers and travelOption but no characterization', () => {
    const result = getFollowersDescription(undefined, followers, travelOption);
    expect(result).toEqual(
      'You have about 20 followers. When you travel, they travel with you.'
    );
  });

  test('should description when travelOption but no followers and no characterization', () => {
    const result = getFollowersDescription(undefined, undefined, travelOption);
    expect(result).toEqual('When you travel, your followers travel with you.');
  });

  test('should description when travelOption and followers andcharacterization', () => {
    const result = getFollowersDescription(
      characterization,
      followers,
      travelOption
    );
    expect(result).toEqual(
      'Your cult is about 20 followers. When you travel, they travel with you.'
    );
  });
});

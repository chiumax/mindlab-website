const { isEquivalent } = require('../object-utils');

describe('object utilities', () => {
  it('should find that two objects are not equivalent', () => {
    const a = {
      season: 'Fall',
      year: 2020,
    };
    const b = {
      season: 'Summer',
      year: 2020,
    };

    const actualResult = isEquivalent(a, b);

    expect(actualResult).toEqual(false);
  });

  it('should find that two objects are equivalent', () => {
    const a = {
      season: 'Fall',
      year: 2020,
    };
    const b = {
      season: 'Fall',
      year: 2020,
    };

    const actualResult = isEquivalent(a, b);

    expect(actualResult).toEqual(true);
  });
});

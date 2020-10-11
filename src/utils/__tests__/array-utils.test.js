const { arrayIntersection } = require('../array-utils');

describe('arrayIntersection', () => {
  it('should have no intersection', () => {
    const a = [1, 2, 3, 4, 5];
    const b = [6, 7, 8, 9];

    const actualResult = arrayIntersection(a, b);

    expect(actualResult.size).toEqual(undefined);
  });

  it('should have an intersection', () => {
    const a = [1, 2, 3, 4, 5];
    const b = [5, 6, 7, 8, 9];

    const actualResult = arrayIntersection(a, b);

    expect(actualResult.length).toEqual(1);
  });

  it('should have an intersection for objects', () => {
    const a = [
      {
        season: 'Spring',
        year: 2020,
      },
      {
        season: 'Summer',
        year: 2020,
      },
    ];
    const b = [
      {
        season: 'Summer',
        year: 2020,
      },
      {
        season: 'Fall',
        year: 2020,
      },
    ];

    const actualResult = arrayIntersection(a, b);

    expect(actualResult.length).toEqual(1);
  });
});

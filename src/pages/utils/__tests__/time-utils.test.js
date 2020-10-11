import { hasSemesterOverlap, pastNthTerm, pastNYearTerms } from '../time-utils';

describe('Unit tests for time-utils.js', () => {
  it('should return the correct semester, 4 terms from Fall 2020 with two seasons', () => {
    // setup
    const seasons = ['Spring', 'Fall'];
    const currentSemester = {
      season: 'Fall',
      year: 2020,
    };
    const numTerms = 4;

    // run function under test
    const actualResult = pastNthTerm(seasons, currentSemester, numTerms);
    const expectedResult = {
      season: 'Fall',
      year: 2018,
    };

    // test assertion
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return the correct semester, 3 terms from Fall 2020 with two seasons', () => {
    // setup
    const seasons = ['Spring', 'Fall'];
    const currentSemester = {
      season: 'Fall',
      year: 2020,
    };
    const numTerms = 3;

    // run function under test
    const actualResult = pastNthTerm(seasons, currentSemester, numTerms);
    const expectedResult = {
      season: 'Spring',
      year: 2019,
    };

    // test assertion
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return the correct semester, 2 terms from Fall 2020 with two seasons', () => {
    // setup
    const seasons = ['Spring', 'Fall'];
    const currentSemester = {
      season: 'Fall',
      year: 2020,
    };
    const numTerms = 2;

    // run function under test
    const actualResult = pastNthTerm(seasons, currentSemester, numTerms);
    const expectedResult = {
      season: 'Fall',
      year: 2019,
    };

    // test assertion
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return the correct semester, 1 term from Fall 2020 with two seasons', () => {
    // setup
    const seasons = ['Spring', 'Fall'];
    const currentSemester = {
      season: 'Fall',
      year: 2020,
    };
    const numTerms = 1;

    // run function under test
    const actualResult = pastNthTerm(seasons, currentSemester, numTerms);
    const expectedResult = {
      season: 'Spring',
      year: 2020,
    };

    // test assertion
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return the correct semester, 1 term from Fall 2020 with three seasons', () => {
    // setup
    const seasons = ['Spring', 'Summer', 'Fall'];
    const currentSemester = {
      season: 'Fall',
      year: 2020,
    };
    const numTerms = 1;

    // run function under test
    const actualResult = pastNthTerm(seasons, currentSemester, numTerms);
    const expectedResult = {
      season: 'Summer',
      year: 2020,
    };

    // test assertion
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return the correct semester, 1 term from Fall 2020 with four seasons', () => {
    // setup
    const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
    const currentSemester = {
      season: 'Fall',
      year: 2020,
    };
    const numTerms = 1;

    // run function under test
    const actualResult = pastNthTerm(seasons, currentSemester, numTerms);
    const expectedResult = {
      season: 'Summer',
      year: 2020,
    };

    // test assertion
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return the correct semester, 1 term from Winter 2020 with four seasons', () => {
    // setup
    const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
    const currentSemester = {
      season: 'Winter',
      year: 2020,
    };
    const numTerms = 1;

    // run function under test
    const actualResult = pastNthTerm(seasons, currentSemester, numTerms);
    const expectedResult = {
      season: 'Fall',
      year: 2020,
    };

    // test assertion
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return the correct semester, 2 terms from Fall 2020 with three seasons', () => {
    // setup
    const seasons = ['Spring', 'Summer', 'Fall'];
    const currentSemester = {
      season: 'Fall',
      year: 2020,
    };
    const numTerms = 2;

    // run function under test
    const actualResult = pastNthTerm(seasons, currentSemester, numTerms);
    const expectedResult = {
      season: 'Spring',
      year: 2020,
    };

    // test assertion
    expect(actualResult).toEqual(expectedResult);
  });
  /*
    Two scenarios whose calculations are different:
    When the year changes (numTerms >= currentSeasonIdx) because the index has to restart from the end of the year.
    When the year doesn't change (numTerms < currentSeasonIdx)
  */
  it('should return the correct semester, 3 terms from Fall 2020 with three seasons', () => {
    // setup
    const seasons = ['Spring', 'Summer', 'Fall'];
    const currentSemester = {
      season: 'Fall',
      year: 2020,
    };
    const numTerms = 3;

    // run function under test
    const actualResult = pastNthTerm(seasons, currentSemester, numTerms);
    const expectedResult = {
      season: 'Fall',
      year: 2019,
    };

    // test assertion
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return the correct semester, 4 terms from Fall 2020 with three seasons', () => {
    // setup
    const seasons = ['Spring', 'Summer', 'Fall'];
    const currentSemester = {
      season: 'Fall',
      year: 2020,
    };
    const numTerms = 4;

    // run function under test
    const actualResult = pastNthTerm(seasons, currentSemester, numTerms);
    const expectedResult = {
      season: 'Summer',
      year: 2019,
    };

    // test assertion
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return the correct semester, 4 terms from Fall 2020 with four seasons', () => {
    // setup
    const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
    const currentSemester = {
      season: 'Fall',
      year: 2020,
    };
    const numTerms = 4;

    // run function under test
    const actualResult = pastNthTerm(seasons, currentSemester, numTerms);
    const expectedResult = {
      season: 'Fall',
      year: 2019,
    };

    // test assertion
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return the correct semester, 2 terms from Fall 2020 with four seasons', () => {
    // setup
    const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
    const currentSemester = {
      season: 'Fall',
      year: 2020,
    };
    const numTerms = 2;

    // run function under test
    const actualResult = pastNthTerm(seasons, currentSemester, numTerms);
    const expectedResult = {
      season: 'Spring',
      year: 2020,
    };

    // test assertion
    expect(actualResult).toEqual(expectedResult);
  });

  it('should calculate pastNYearTerms correctly with two seasons and two years', () => {
    // setup
    const currentSemester = {
      year: 2020,
      season: 'Fall',
    };
    const seasons = ['Spring', 'Fall'];
    const numPastYears = 2;

    // test function
    const actualResult = pastNYearTerms(seasons, currentSemester, numPastYears);
    const expectedResult = [
      {
        year: 2020,
        season: 'Spring',
      },
      {
        year: 2019,
        season: 'Fall',
      },
      {
        year: 2019,
        season: 'Spring',
      },
      {
        year: 2018,
        season: 'Fall',
      },
    ];

    // make assertion
    expect(actualResult).toEqual(expectedResult);
  });

  it('should calculate pastNYearTerms correctly with three seasons and three years', () => {
    // setup
    const currentSemester = {
      year: 2020,
      season: 'Fall',
    };
    const seasons = ['Spring', 'Summer', 'Fall'];
    const numPastYears = 3;

    // test function
    const actualResult = pastNYearTerms(seasons, currentSemester, numPastYears);
    const expectedResult = [
      {
        year: 2020,
        season: 'Summer',
      },
      {
        year: 2020,
        season: 'Spring',
      },
      {
        year: 2019,
        season: 'Fall',
      },
      {
        year: 2019,
        season: 'Summer',
      },
      {
        year: 2019,
        season: 'Spring',
      },
      {
        year: 2018,
        season: 'Fall',
      },
      {
        year: 2018,
        season: 'Summer',
      },
      {
        year: 2018,
        season: 'Spring',
      },
      {
        year: 2017,
        season: 'Fall',
      },
    ];

    // make assertion
    expect(actualResult).toEqual(expectedResult);
  });

  it('should calculate pastNYearTerms correctly with three seasons and two years', () => {
    // setup
    const currentSemester = {
      year: 2020,
      season: 'Fall',
    };
    const seasons = ['Spring', 'Summer', 'Fall'];
    const numPastYears = 2;

    // test function
    const actualResult = pastNYearTerms(seasons, currentSemester, numPastYears);
    const expectedResult = [
      {
        year: 2020,
        season: 'Summer',
      },
      {
        year: 2020,
        season: 'Spring',
      },
      {
        year: 2019,
        season: 'Fall',
      },
      {
        year: 2019,
        season: 'Summer',
      },
      {
        year: 2019,
        season: 'Spring',
      },
      {
        year: 2018,
        season: 'Fall',
      },
    ];

    // make assertion
    expect(actualResult).toEqual(expectedResult);
  });

  // it('should calculate pastNYearTerms correctly with four seasons and four years', () => {
  //   // setup
  //   const currentSemester = {
  //     year: 2020,
  //     season: 'Fall',
  //   };
  //   const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
  //   const numPastYears = 4;

  //   // test function
  //   const actualResult = pastNYearTerms(seasons, currentSemester, numPastYears);
  //   const expectedResult = [
  //     {
  //       year: 2020,
  //       season: 'Summer',
  //     },
  //     {
  //       year: 2020,
  //       season: 'Spring',
  //     },
  //     {
  //       year: 2019,
  //       season: 'Winter',
  //     },
  //     {
  //       year: 2019,
  //       season: 'Fall',
  //     },
  //     {
  //       year: 2019,
  //       season: 'Summer',
  //     },
  //     {
  //       year: 2019,
  //       season: 'Spring',
  //     },
  //     {
  //       year: 2018,
  //       season: 'Winter',
  //     },
  //     {
  //       year: 2018,
  //       season: 'Fall',
  //     },
  //     {
  //       year: 2018,
  //       season: 'Summer',
  //     },
  //     {
  //       year: 2018,
  //       season: 'Spring',
  //     },
  //     {
  //       year: 2017,
  //       season: 'Winter',
  //     },
  //     {
  //       year: 2017,
  //       season: 'Fall',
  //     },
  //     {
  //       year: 2017,
  //       season: 'Summer',
  //     },
  //     {
  //       year: 2017,
  //       season: 'Spring',
  //     },
  //     {
  //       year: 2016,
  //       season: 'Winter',
  //     },
  //     {
  //       year: 2016,
  //       season: 'Fall',
  //     },
  //   ];

  //   // make assertion
  //   expect(actualResult).toEqual(expectedResult);
  // });

  describe('hasSemesterOverlap', () => {
    it('should find no overlaps', () => {
      // setup
      const setA = new Set();
      setA.add({
        season: 'Fall',
        year: 2020,
      });

      const setB = new Set();
      setB.add({
        season: 'Summer',
        year: 2020,
      });

      // run test
      const actualResult = hasSemesterOverlap(setA, setB);
      const expectedResult = false;

      // make assertion
      expect(actualResult).toEqual(expectedResult);
    });

    it('should find an overlap', () => {
      // setup
      const arrayA = [
        {
          season: 'Fall',
          year: 2020,
        },
        {
          season: 'Summer',
          year: 2020,
        },
      ];

      const arrayB = [
        {
          season: 'Summer',
          year: 2020,
        },
        {
          season: 'Spring',
          year: 2020,
        },
      ];

      // run test
      const actualResult = hasSemesterOverlap(arrayA, arrayB);

      // make assertion
      expect(actualResult).toEqual(true);
    });
  });
});

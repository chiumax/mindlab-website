import { setIntersection } from '../set-utils';

describe('setIntersection tests', () => {
  it('should return no intersection', () => {
    // setup
    const setA = new Set();
    setA.add(1);

    const setB = new Set();
    setB.add(2);

    // run function under test
    const actualResult = setIntersection(setA, setB);
    const expectedResult = new Set();

    // assert
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return an intersection', () => {
    // setup
    const setA = new Set();
    setA.add(1);
    setA.add(2);

    const setB = new Set();
    setB.add(2);
    setB.add(3);

    // run function under test
    const actualResult = setIntersection(setA, setB);
    const expectedResult = new Set();
    expectedResult.add(2);

    // assert
    expect(actualResult).toEqual(expectedResult);
  });

  it('should return an intersection for complex objects', () => {
    // setup
    const setA = new Set();
    setA.add(1);
    setA.add(2);

    const setB = new Set();
    setB.add(2);
    setB.add(3);

    // run function under test
    const actualResult = setIntersection(setA, setB);
    const expectedResult = new Set();
    expectedResult.add(2);

    // assert
    expect(actualResult).toEqual(expectedResult);
  });
});

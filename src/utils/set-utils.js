/*
  Helper file with helper functions for Sets
*/

/**
 * Returns the set which intersects Set A and Set B
 */
export const setIntersection = (setA, setB) => {
  const intersect = new Set();
  for (const element of setB) {
    if (setA.has(element)) {
      intersect.add(element);
    }
  }
  for (const element of setA) {
    if (setB.has(element)) {
      intersect.add(element);
    }
  }
  return intersect;
};

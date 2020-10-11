import { isEquivalent, isPrimitive } from './object-utils';

/**
 * Assumes both inputs are arrays of the same data type
 */
export const arrayIntersection = (arrayA, arrayB) => {
  const set = new Set();

  arrayA.forEach(a => {
    arrayB.forEach(b => {
      if (isPrimitive(a)) {
        if (a === b) {
          set.add(a);
        }
      } else if (isEquivalent(a, b)) {
        set.add(a);
      }
    });
  });

  const array = Array.from(set);

  return array;
};

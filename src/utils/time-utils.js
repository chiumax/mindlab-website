import { arrayIntersection } from './array-utils';

/*
  Helper file which contains utilities for time
*/

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   Modify these values to change the current semester
* * * * * * * * * * * * * * * * * * * * * * * * * * * */
const CURRENT_YEAR = 2020;
const CURRENT_SEASON = 'Fall';
export const NUM_PAST_YEARS = 2; // controls the number of years to display
// list of all available semester types
export const SEASONS = ['Spring', 'Summer', 'Fall'];

/**
 * Calculate ones iteration of the above loop.
 * Pass in the number of terms from the input semester
 *
 * Assumes that
 *  * `seasons` is an array of strings
 *  * `currentSemester` has a string property called `season` which is an element of `seasons`
 */
export const pastNthTerm = (seasons, currentSemester, numTerms) => {
  const currentSeasonIdx = seasons.indexOf(currentSemester.season);

  /*
    Two types of operations have to happen here:
    * if less than a year has passed, then 
    * else use
  */
  let year;
  let seasonIdx;
  let season;
  if (numTerms < currentSeasonIdx) {
    // eslint-disable-next-line prefer-destructuring
    year = currentSemester.year;

    seasonIdx = Math.round(Math.abs(currentSeasonIdx - numTerms) % seasons.length);
    season = seasons[seasonIdx];
  } else {
    /*
      quotient is split into two parts:
      * right of the decimal is the number of seasons
      * left of the decimal is the number of years
    */

    const quotient = numTerms / seasons.length;

    const numYearsPast = Math.floor(quotient);

    year = currentSemester.year - numYearsPast;

    /*
      Figuring out which season is a little more complex it seems, especially when # terms > # years
      numTerms - currentSeasonIdx - (numYearsPast * seasons.length)
    */

    seasonIdx = Math.round(Math.abs(numTerms - currentSeasonIdx - numYearsPast * seasons.length) % seasons.length);
    season = seasons[seasonIdx];
  }

  return {
    year,
    season,
  };
};

export const CURRENT_SEMESTER = {
  year: CURRENT_YEAR,
  season: CURRENT_SEASON,
};

/*
 * This calculation is probably needlessly complex, but it's what works.
 * There's a well known issue that computers can't handle division and fractions that well. As a result of this,
 * it's better to try and avoid dividing anything and keeping the numbers whole and using modulus or something
 * like that.
 *
 * Basically, the year is going to be a whole number, and the seasonIdx is going to be a fraction, but left whole.
 *
 * If time is elapsing (moving forward),
 *  * increase seasonIdx
 *  * if seasonIdx === SEASONS.length
 *    * set seasonIdx = 0
 *    * increment year by 1
 *
 * If time is going backward
 *  * decrease seasonIdx
 *  * if seasonIdx === -1
 *    * set seasonIdx to SEASONS.length - 1
 *    * decrement year by 1
 *
 * Has a few assumptions:
 *  * `seasons` is an array of strings
 *  * `currentSemester` has a string property called `season` which is an element of `seasons`
 */
export const pastNYearTerms = (seasons, currentSemester, numYears) => {
  // An array of numbers whose value is the number of terms from the starting semester
  const numTermsFromStart = Array(seasons.length * numYears)
    .fill(0)
    .map((value, index) => index + 1);

  return numTermsFromStart.map(numTerms => pastNthTerm(seasons, currentSemester, numTerms));
};

/*
  Given two arrays of semesters, figure out if they have any elements 
*/
export const hasSemesterOverlap = (semesterGroupA, semesterGroupB) => {
  const intersection = arrayIntersection(semesterGroupA, semesterGroupB);
  return intersection.length > 0;
};

/**
 * Assumes that incoming values have a specific format, and returns what's on the inside.
 * For example, these are acceptable inputs, and their corresponding outputs:
 *    * `./file-name.jpg` => 'file-name"
 *    * `path/to/filename.png` => `filename`
 *    * `../../path/to/file.woff` => `file`
 *
 * Basically:
 *    1. finds the index of the last slash
 *    2. finds the index of the last period
 *    3. takes the substring between
 * @param {*} filename like ./file-name.png
 */
export const getFileName = filename => {
  const lastSlashIdx = filename.lastIndexOf('/') + 1;
  const lastPeriodIdx = filename.lastIndexOf('.');

  return filename.slice(lastSlashIdx, lastPeriodIdx);
};

import moment from 'moment';

const memoryConversions = {
  k: 1000,
  M: 1000 ** 2,
  G: 1000 ** 3,
  T: 1000 ** 4,
  P: 1000 ** 5,
  E: 1000 ** 6,
  Ki: 1024,
  Mi: 1024 ** 2,
  Gi: 1024 ** 3,
  Ti: 1024 ** 4,
  Pi: 1024 ** 5,
  Ei: 1024 ** 6,
};

/**
 * Format a given duration in milliseconds to a hh:mm:ss string
 * @param value Duration in ms
 * @return {string} formatted string
 */
export const formatDuration = (value) => {
  const duration = moment.duration(value);
  return Math.floor(duration.asHours()) + moment.utc(duration.asMilliseconds())
    .format(':mm:ss');
};

/**
 * Parse memory values to bytes, Kubernetes style
 * @param value A kubernetes-like formatted string (eg. 20Gi)
 * @return {number} Bytes value
 */
export const parseMemory = (value) => {
  const unit = value.match(/^([0-9]+)([A-Za-z]{1,2})$/);
  if (unit) {
    return parseInt(unit[1], 10) * memoryConversions[unit[2]];
  }
  return parseInt(value, 10);
};

/**
 * Converts Kubernetes-style memory from one unit to another
 * @param value Kubernetes-style memory string
 * @param unit Kubernetes-style unit to convert to
 * @return {string} Kubernetes-style converted value
 */
export const convertMemory = (value, unit) => {
  const bytes = parseMemory(value);
  return (bytes / memoryConversions[unit]).toFixed(2) + unit;
};

export default {
  parseMemory,
  formatDuration,
  convertMemory,
};

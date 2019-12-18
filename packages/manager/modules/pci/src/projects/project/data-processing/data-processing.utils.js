import moment from 'moment';
import { mapValues, keyBy, startCase } from 'lodash';

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
 * Convert Kubernetes-style memory from one unit to another
 * @param value Kubernetes-style memory string
 * @param unit Kubernetes-style unit to convert to
 * @return {string} Kubernetes-style converted value
 */
export const convertMemory = (value, unit) => {
  const bytes = parseMemory(value);
  return (bytes / memoryConversions[unit]).toFixed(2) + unit;
};


/**
 * Build a UI friendly job object from API response
 * @param job A job object from APIv6
 * @return {{duration: number, engineParameters: {},
 *  type: string, vcores: number, ram: string, status: string}}
 */
export const summarizeSparkJob = (job) => {
  const engineParameters = mapValues(keyBy(job.engineParameters, 'name'), 'value');
  engineParameters.arguments = engineParameters.conf.split(','); // FIXME with apiv6 PR
  const sparkJob = {
    ...job,
    vcores: (parseFloat(engineParameters.driver_cores)
      + parseFloat(engineParameters.executor_cores)
      * parseFloat(engineParameters.executor_num)),
    ram: convertMemory((parseMemory(engineParameters.driver_memory)
      + parseMemory(engineParameters.executor_memory)
      * parseFloat(engineParameters.executor_num)).toString(), 'Gi'),
    type: 'Spark',
    status: startCase(job.status.toLowerCase()),
    duration: (moment(job.endDate) - moment(job.creationDate)).valueOf(),
    engineParameters,
  };
  return sparkJob;
};

export const summarizeJob = (job) => {
  switch (job.engine) {
    case 'spark':
      return summarizeSparkJob(job);
    default:
      return job;
  }
};

export default {
  parseMemory,
  formatDuration,
  convertMemory,
  summarizeSparkJob,
};

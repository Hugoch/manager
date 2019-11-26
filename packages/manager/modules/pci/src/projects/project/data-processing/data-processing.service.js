import { sortBy, uniqBy } from 'lodash';

export default class DataProcessingService {
  /* @ngInject */
  constructor() {
    this.logs = [];
  }

  /**
   * Retrieve list of jobs
   * @param projectId list jobs related to this project id
   * @return {Promise<any>}
   */
  getJobs(projectId) {
    return new Promise((resolve) => {
      resolve([{
        id: '99b7e763-7af7-4047-b97f-a51a210f5aa5',
        name: 'flamboyant-steve-1107',
        region: 'GRA',
        type: 'Spark',
        vcores: 10,
        ram: 256,
        creation_date: 1574677770,
        status: 'Running',
      }]);
    });
  }

  getJob(jobId) {
    return new Promise((resolve) => {
      resolve({
        id: '99b7e763-7af7-4047-b97f-a51a210f5aa5',
        name: 'flamboyant-steve-1107',
        region: 'GRA',
        type: 'Spark',
        vcores: 10,
        ram: 256,
        creation_date: 1574671577,
        status: 'Running',
        end_date: 1574678877,
        start_date: 1574671677,
        container_name: 'my-code',
        engine_parameters: {
          driver_cores: 10,
          driver_memory: '2Gi',
          executor_cores: 8,
          executor_memory: '3Gi',
          executor_num: 4,
          job_type: 'spark',
          executor_memory_overhead: '512Mi',
          driver_memory_overhead: '384Mi',
          jar_file: 'spark-examples.jar',
          main_class: 'com.apache.spark.examples.SparkPi',
          arguments: ['1000'],
        },
      });
    });
  }

}

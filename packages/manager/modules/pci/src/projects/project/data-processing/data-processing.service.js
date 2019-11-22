export default class DataProcessingService {
  /* @ngInject */
  constructor() {

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
        name: 'test',
        region: 'GRA',
        type: 'Spark',
        vcores: 10,
        ram: 256,
        creation_date: '10/10/2019',
        status: 'Running',
      }]);
    });
  }

  getJob(jobId) {
    return new Promise((resolve) => {
      resolve({
        id: '99b7e763-7af7-4047-b97f-a51a210f5aa5',
        name: 'test',
        region: 'GRA',
        type: 'Spark',
        vcores: 10,
        ram: 256,
        creation_date: '10/10/2019',
        status: 'Running',
      });
    });
  }
}

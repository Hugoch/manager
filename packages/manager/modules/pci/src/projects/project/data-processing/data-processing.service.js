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
}

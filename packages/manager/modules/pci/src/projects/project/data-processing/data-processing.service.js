import { summarizeJob } from './data-processing.utils';
import { keyBy } from 'lodash';

export default class DataProcessingService {
  /* @ngInject */
  constructor($q, OvhApiCloudProjectDataProcessing) {
    this.logs = [];
    this.$q = $q;
    this.OvhApiCloudProjectDataProcessingJobs = OvhApiCloudProjectDataProcessing.Jobs()
      .iceberg();
    this.OvhApiCloudProjectDataProcessingCapabilities = OvhApiCloudProjectDataProcessing
      .Capabilities()
      .iceberg();
  }

  /**
   * Retrieve list of jobs
   * @param projectId List jobs related to this project id
   * @return {Promise<any>}
   */
  getJobs(projectId) {
    // TODO implement filters
    return this.OvhApiCloudProjectDataProcessingJobs
      .query()
      .expand('CachedObjectList-Pages')
      .limit(100)
      .execute({ serviceName: projectId })
      .$promise
      .then(jobs => jobs.data.map(job => summarizeJob(job)));
  }

  /**
   * Retrieve a single job
   * @param projectId Project id containing the job
   * @param jobId Job id
   * @return {Promise<any>}
   */
  getJob(projectId, jobId) {
    return this.OvhApiCloudProjectDataProcessingJobs
      .get()
      .execute({
        serviceName: projectId,
        jobId,
      })
      .$promise
      .then(job => summarizeJob(job.data));
  }

  /**
   * Retrieve capabilities
   * @param projectId Project to get capabilities from
   * @return {Promise<any>}
   */
  getCapabilities(projectId) {
    return this.OvhApiCloudProjectDataProcessingCapabilities
      .query()
      .execute({ serviceName: projectId })
      .$promise
      .then(capabilities => keyBy(capabilities.data, e => e.name));
  }
}

import { keyBy } from 'lodash';
import { summarizeJob } from './data-processing.utils';

export default class DataProcessingService {
  /* @ngInject */
  constructor($q, OvhApiCloudProjectDataProcessing) {
    this.logs = [];
    this.$q = $q;
    this.OvhApiCloudProjectDataProcessingJobs = OvhApiCloudProjectDataProcessing
      .Jobs()
      .iceberg();
    this.OvhApiCloudProjectDataProcessingCapabilities = OvhApiCloudProjectDataProcessing
      .Capabilities()
      .iceberg();
    this.OvhApiCloudProjectDataProcessingActivations = OvhApiCloudProjectDataProcessing
      .Activations()
      .iceberg();
    this.OvhApiCloudProjectDataProcessingMetrics = OvhApiCloudProjectDataProcessing
      .Metrics()
      .iceberg();
  }

  /**
   * Retrieve list of activations
   * @param projectId string Project to list activations from
   * @return {Promise<any>}
   */
  getActivations(projectId) {
    return this.OvhApiCloudProjectDataProcessingActivations
      .query()
      .execute({ serviceName: projectId })
      .$promise;
  }

  /**
   * Activate project with the given id
   * @param projectId string Project id to activate
   * @return {*}
   */
  activate(projectId) {
    return this.OvhApiCloudProjectDataProcessingActivations
      .post()
      .execute({ serviceName: projectId })
      .$promise;
  }

  /**
   * Retrieve list of jobs
   * @param projectId string List jobs related to this project id
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
   * @param projectId string Project id containing the job
   * @param jobId string Job id
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
   * @param projectId string Project to get capabilities from
   * @return {Promise<any>}
   */
  getCapabilities(projectId) {
    return this.OvhApiCloudProjectDataProcessingCapabilities
      .query()
      .execute({ serviceName: projectId })
      .$promise
      .then(capabilities => keyBy(capabilities.data, e => e.name));
  }

  /**
   * Submit a new job to the API
   * @param projectId string Id of the project to submit job to
   * @param job Job object
   * @return {Promise<any>}
   */
  submitJob(projectId, job) {
    return this.OvhApiCloudProjectDataProcessingJobs
      .post()
      .execute({ serviceName: projectId, ...job })
      .$promise;
  }

  /**
   * Terminate a running job
   * @param projectId string Id of the project
   * @param jobId string Id of the job to terminate
   * @return {Promise<any>}
   */
  terminateJob(projectId, jobId) {
    return this.OvhApiCloudProjectDataProcessingJobs
      .delete()
      .execute({
        serviceName: projectId,
        jobId,
      })
      .$promise;
  }

  /**
   * Retrieve logs from a job
   * @param projectId string Id of the project
   * @param jobId string Id of the job to terminate
   * @param from string From how long ago we want logs.
   * Example: from=now-2h. Or since when we want the logs.
   * Example: 2019-10-28T12:00:00.000 (must be UTC).
   * @return {*}
   */
  getLogs(projectId, jobId, from) {
    return this.OvhApiCloudProjectDataProcessingJobs
      .logs()
      .execute({
        serviceName: projectId,
        from,
        jobId,
      })
      .$promise
      .then(res => res.data);
  }

  /**
   * Retrieve metrics token for the given project
   * @param projectId
   * @return {*}
   */
  getMetricsToken(projectId) {
    return this.OvhApiCloudProjectDataProcessingMetrics
      .query()
      .execute({
        serviceName: projectId,
      })
      .$promise;
  }
}

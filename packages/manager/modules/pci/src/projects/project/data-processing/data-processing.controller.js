import { isJobRunning, getClassFromStatus } from './data-processing.utils';
import { DATA_PROCESSING_UI_URL } from './data-processing.constants';

export default class {
  /* @ngInject */
  constructor($state, CucCloudMessage, dataProcessingService, CucRegionService) {
    this.$state = $state;
    this.cucCloudMessage = CucCloudMessage;
    this.dataProcessingService = dataProcessingService;
    this.cucRegionService = CucRegionService;
    this.isJobRunning = isJobRunning;
    this.getClassFromStatus = getClassFromStatus;
    this.DATA_PROCESSING_UI_URL = DATA_PROCESSING_UI_URL;
  }

  /**
   * Load a modal asking confirmation to terminate current job
   */
  terminateJob(job) {
    this.$state.go('pci.projects.project.data-processing.terminate', {
      projectId: this.projectId,
      jobId: job.id,
      jobName: job.name,
    });
  }
}

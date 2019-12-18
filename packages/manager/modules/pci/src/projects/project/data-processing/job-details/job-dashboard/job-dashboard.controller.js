import {
  DATA_PROCESSING_STATUS_TO_CLASS, DATA_PROCESSING_STATUSES,
  DATA_PROCESSING_UI_URL,
} from '../../data-processing.constants';

export default class {
  /* @ngInject */
  constructor($state, $uibModal, CucCloudMessage, dataProcessingService, CucRegionService) {
    this.$state = $state; // router state
    this.cucCloudMessage = CucCloudMessage;
    this.dataProcessingService = dataProcessingService;
    this.cucRegionService = CucRegionService;
    this.DATA_PROCESSING_STATUS_TO_CLASS = DATA_PROCESSING_STATUS_TO_CLASS;
    this.DATA_PROCESSING_UI_URL = DATA_PROCESSING_UI_URL;
  }

  /**
   * Load a modal asking confirmation to terminate current job
   */
  terminateJob() {
    this.$state.go('pci.projects.project.data-processing.job-details.dashboard.terminate', {
      projectId: this.projectId,
      jobId: this.job.id,
      jobName: this.job.name,
    });
  }

  showBillingConsole() {
    this.$state.go('pci.projects.project.billing', { projectId: this.projectId });
  }

  browseObjectStorage() {
    this.$state.go('pci.projects.project.storages.objects', { projectId: this.projectId });
  }

  isJobRunning() {
    return this.job.status in [DATA_PROCESSING_STATUSES.PENDING,
      DATA_PROCESSING_STATUSES.RUNNING, DATA_PROCESSING_STATUSES.SUBMITTED];
  }

}

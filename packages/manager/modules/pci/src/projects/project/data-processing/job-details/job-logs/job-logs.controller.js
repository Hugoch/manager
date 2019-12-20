export default class {
  /* @ngInject */
  constructor($state, $uibModal, CucCloudMessage, dataProcessingJobLogsService, CucRegionService) {
    this.$state = $state; // router state
    this.cucCloudMessage = CucCloudMessage;
    this.dataProcessingJobLogsService = dataProcessingJobLogsService;
    this.cucRegionService = CucRegionService;
    this.logger = dataProcessingJobLogsService;
  }

  $onInit() {
    this.logger.startLogsPolling(this.projectId, this.job.id, 5000, true);
  }

  $onDestroy() {
    this.logger.stopLogsPolling();
  }
}

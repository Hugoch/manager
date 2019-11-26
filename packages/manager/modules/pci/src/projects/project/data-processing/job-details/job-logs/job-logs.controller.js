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
    console.log(this.logger);
    this.logger.startLogsPolling(this.jobId, 5000);
  }

  $onDestroy() {
    this.logger.stopLogsPolling();
  }
}

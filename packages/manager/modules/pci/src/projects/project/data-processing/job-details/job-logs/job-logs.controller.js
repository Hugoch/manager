export default class {
  /* @ngInject */
  constructor($state, $uibModal, CucCloudMessage, dataProcessingJobLogsService) {
    this.$state = $state; // router state
    this.dataProcessingJobLogsService = dataProcessingJobLogsService;
    this.logger = dataProcessingJobLogsService;
    // let's do some binding
    this.downloadLogs = this.downloadLogs.bind(this);
  }

  $onInit() {
    this.logger.startLogsPolling(this.projectId, this.job.id, 5000, true);
  }

  $onDestroy() {
    this.logger.stopLogsPolling();
  }

  downloadLogs() {
    const re = /swift:\/\/(.*)\/(.*)/;
    const logsUrl = this.logger.logs.logsAddress;
    if (logsUrl !== undefined && logsUrl !== null) {
      const matches = logsUrl.match(re);
      this.logger.downloadObject(this.projectId, this.job.region, matches[1], matches[2]);
    }
  }
}

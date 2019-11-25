import { DATA_PROCESSING_STATUS_TO_CLASS } from './data-processing.constants';

export default class {
  /* @ngInject */
  constructor($state, CucCloudMessage, dataProcessingService, CucRegionService) {
    this.$state = $state;
    this.cucCloudMessage = CucCloudMessage;
    this.dataProcessingService = dataProcessingService;
    this.cucRegionService = CucRegionService;
  }

  /**
   * Get a CSS class name from a given job status
   * @param status
   * @return {string|any}
   */
  getClassFromStatus(status) {
    const normalizedStatus = status.toUpperCase();
    if (normalizedStatus in DATA_PROCESSING_STATUS_TO_CLASS) {
      return DATA_PROCESSING_STATUS_TO_CLASS[normalizedStatus];
    }
    return 'error';
  }
}

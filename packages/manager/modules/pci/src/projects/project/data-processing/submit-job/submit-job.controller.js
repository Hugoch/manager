export default class {
  /* @ngInject */
  constructor($state, CucCloudMessage, dataProcessingService, CucRegionService) {
    console.log('SUBMIT CONTROLLER');
    this.$state = $state;
    this.cucCloudMessage = CucCloudMessage;
    this.dataProcessingService = dataProcessingService;
    this.cucRegionService = CucRegionService;
  }
}

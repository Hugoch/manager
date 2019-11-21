export default class {
  /* @ngInject */
  constructor($state, CucCloudMessage, dataProcessingService, CucRegionService) {
    this.$state = $state; // router state
    this.cucCloudMessage = CucCloudMessage;
    this.dataProcessingService = dataProcessingService;
    this.cucRegionService = CucRegionService;
    // let's do some function binding
    this.onChangeRegionHandler = this.onChangeRegionHandler.bind(this);
    this.onChangeJobTypeHandler = this.onChangeJobTypeHandler.bind(this);
    // initialize component state
    this.state = {
      region: null,
    };
  }

  /**
   * Fetch available regions from capabilities and update binding
   */
  updateAvailableRegions() {
    this.regions = [
      {
        name: 'GRA',
        hasEnoughQuota: () => true,
      },
    ];
  }

  /**
   * Handler for region selector change
   * @param name Name of the selected region
   */
  onChangeRegionHandler({ name }) {
    this.state.region = name;
    console.log(this.state);
  }

  onChangeJobTypeHandler(value) {
    this.state.jobType = value;
    console.log(value);
  }
}

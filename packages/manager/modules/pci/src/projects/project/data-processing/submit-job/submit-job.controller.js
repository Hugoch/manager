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
      jobType: 'spark',
    };
    this.jobSizing = {};
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

  /**
   * Handler for job type selector job
   * @param jobType Selected job type
   */
  onChangeJobTypeHandler(jobType) {
    this.state.jobType = jobType;
    console.log(this.state);
  }

  onSubmit() {
    console.log(this.jobSizing);
  }
}

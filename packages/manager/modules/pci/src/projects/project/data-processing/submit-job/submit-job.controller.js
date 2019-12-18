import { find } from 'lodash';

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
      jobSizing: {},
    };
    // we use this trick to trigger a state update of child component. This circumvent the missing
    // onChange event on oui-field components.
    this.jobSizingValidate = false;
  }

  /**
   * Fetch available regions from capabilities and update binding
   */
  updateAvailableRegions() {
    const engine = find(this.capabilities, e => e.name === this.state.jobType.engine);
    const version = find(engine.availableVersions, v => v.name === this.state.jobType.version);
    this.regions = version.availableRegions.map(region => ({
      name: region,
      hasEnoughQuota: () => true,
    }));
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

  onSubmitJobSizingHandler() {
    // trigger job sizing component values update
    this.jobSizingValidate = !this.jobSizingValidate;
    setTimeout(() => console.log(this.state), 0);
  }

  onSubmitJobConfigHandler() {
    // TODO implement
  }
}

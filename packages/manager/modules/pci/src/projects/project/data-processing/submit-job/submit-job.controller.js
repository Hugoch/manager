import { find } from 'lodash';
import { convertMemory } from '../data-processing.utils';

export default class {
  /* @ngInject */
  constructor($scope, $state, CucCloudMessage, dataProcessingService, CucRegionService) {
    this.$scope = $scope;
    this.$state = $state; // router state
    this.cucCloudMessage = CucCloudMessage;
    this.dataProcessingService = dataProcessingService;
    this.cucRegionService = CucRegionService;
    // let's do some function binding
    this.onChangeRegionHandler = this.onChangeRegionHandler.bind(this);
    this.onChangeJobTypeHandler = this.onChangeJobTypeHandler.bind(this);
    this.onChangeJobConfigHandler = this.onChangeJobConfigHandler.bind(this);
    // initialize component state
    this.state = {
      region: null,
      jobType: {},
      jobSizing: {},
      jobConfig: {},
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
  }

  /**
   * Handler for job config change
   * @param jobConfig Job configuration
   */
  onChangeJobConfigHandler(jobConfig) {
    this.state.jobConfig = jobConfig;
  }

  onSubmitJobHandler() {
    // TODO implement
    console.log(this.state.jobConfig);
    const payload = {
      containerName: this.state.jobConfig.swiftContainer,
      engine: this.state.jobType.engine,
      engineVersion: this.state.jobType.version,
      name: this.state.jobConfig.jobName,
      region: this.state.region,
      engineParameters: [
        {
          name: 'main_application_code',
          value: this.state.jobConfig.jarFile,
        },
        {
          name: 'main_class_name',
          value: this.state.jobConfig.mainClass,
        },
        {
          name: 'arguments',
          value: this.state.jobConfig.arguments,
        },
        {
          name: 'driver_memory',
          value: convertMemory(`${this.state.jobSizing.driverMemoryGb}G`, 'Gi'),
        },
        {
          name: 'executor_memory',
          value: convertMemory(`${this.state.jobSizing.workersMemoryGb}G`, 'Gi'),
        },
        {
          name: 'driver_cores',
          value: this.state.jobSizing.driverCores,
        },
        {
          name: 'executor_num',
          value: this.state.jobSizing.workerCount,
        },
        {
          name: 'executor_cores',
          value: this.state.jobSizing.workerCores,
        },
        {
          name: 'job_type',
          value: this.state.jobType.engine,
        },
      ],
    };
    console.log(payload);
  }
}

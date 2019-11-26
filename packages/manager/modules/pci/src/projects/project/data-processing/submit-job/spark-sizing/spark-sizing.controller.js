import {
  DRIVER_TEMPLATES,
  MEMORY_OVERHEAD_RATIO,
  MIN_MEMORY_OVERHEAD_MB,
  WORKER_TEMPLATES,
} from './spark-sizing.constants';

export default class {
  /* @ngInject */
  constructor() {
    // let's do some bindings
    this.onClickAdvancedConfigurationHandler = this.onClickAdvancedConfigurationHandler.bind(this);
    // create state
    this.state = {};
  }

  $onInit() {
    this.driverTemplates = DRIVER_TEMPLATES;
    this.workerTemplates = WORKER_TEMPLATES;
    this.minMemoryOverheadMb = MIN_MEMORY_OVERHEAD_MB;
    // initialize component state
    this.state = {
      driverTemplate: '1',
      workerTemplate: '1',
      workerCount: 1,
      workerCores: 1,
      workersMemoryGb: 1,
      workerOverheadMemoryMb: MIN_MEMORY_OVERHEAD_MB,
      driverCores: 1,
      driverMemoryGb: 1,
      driverOverheadMemoryMb: MIN_MEMORY_OVERHEAD_MB,
      advancedSizing: false,
    };
  }

  /**
   * Event handler that is called each time component is updated
   * Update component `values` binding to let know our parent component about state update
   * Parent must use `validate` binding to trigger changes.
   */
  $onChanges() {
    Object.assign(this.values, this.state);
    console.log(this.values);
  }

  /**
   * Handler for sizing advanced configuration link
   */
  onClickAdvancedConfigurationHandler() {
    console.log('advanced');
    if (!this.state.advancedSizing) {
      this.updateStateFromTemplate();
    }
    this.state.advancedSizing = !this.state.advancedSizing;
  }

  /**
   * Use sizing template to update all the individual cores/memory fields of current state
   */
  updateStateFromTemplate() {
    const driverTpl = this.driverTemplates[parseInt(this.state.driverTemplate, 10) - 1];
    const workerTpl = this.workerTemplates[parseInt(this.state.workerTemplate, 10) - 1];
    // compute driver overhead in Mb while ensuring Spark's minimum
    const driverMemoryOverheadMb = Math.max(driverTpl.memory / 1e6 * MEMORY_OVERHEAD_RATIO,
      MIN_MEMORY_OVERHEAD_MB);
    // compute worker overhead in Mb while ensuring Spark's minimum
    const workerMemoryOverheadMb = Math.max(workerTpl.memory / 1e6 * MEMORY_OVERHEAD_RATIO,
      MIN_MEMORY_OVERHEAD_MB);
    Object.assign(this.state, {
      driverCores: driverTpl.cores,
      driverMemoryGb: driverTpl.memory / 1e9,
      driverMemoryOverheadMb,
      workerCores: workerTpl.cores,
      workerMemoryGb: workerTpl.memory / 1e9,
      workerMemoryOverheadMb,
    });
  }
}

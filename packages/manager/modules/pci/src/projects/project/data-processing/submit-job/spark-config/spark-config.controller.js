import { ARGUMENTS_VALIDATION_PATTERN } from './spark-config.constants';

export default class {
  /* @ngInject */
  constructor() {
    // create state
    this.state = {};
    this.sparkVersions = {};
    this.swiftContainers = {};
    this.currentArgument = '';
  }

  $onInit() {
    // FIXME get from API
    this.sparkVersions = [{
      id: 1,
      name: 'spark-2.4.3-mllib',
    }];
    this.swiftContainers = ['my-code-container', 'another-container'];
    // initialize component state
    this.state = {
      sparkVersion: this.sparkVersions[0].name,
      arguments: [],
    }
    ;
  }

  /**
   * Handler to add current arguments to the chips argument list
   * @param evt <enter> key event
   */
  onSubmitArgumentHandler(evt) {
    evt.preventDefault();
    const arg = evt.target.value;
    // validate argument against authorized pattern
    if (arg.match(ARGUMENTS_VALIDATION_PATTERN)) {
      this.state.arguments.push({
        title: arg,
      });
      this.currentArgument = '';
    }
  }
}

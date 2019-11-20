import template from './data-processing.html';
import controller from './data-processing.controller';

export default {
  template,
  controller,
  bindings: {
    jobs: '<', // one-way binding to jobs controller
    submitJob: '<', // one-way binding to job submission controller
  },
};

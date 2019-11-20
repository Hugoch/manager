import angular from 'angular';
import '@uirouter/angularjs';

import routing from './submit-job.routing';
import regionSelector from './region-selector';
import jobTypeSelector from './jobtype-selector';

import dataProcessingSubmitJobComponent from './submit-job.component';

const moduleName = 'ovhManagerDataProcessingSubmitJobComponent';

angular
  .module(moduleName, [
    'ui.router',
    regionSelector,
    jobTypeSelector,
  ])
  .config(routing)
  .component('dataProcessingSubmitJobComponent', dataProcessingSubmitJobComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
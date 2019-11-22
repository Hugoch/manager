import angular from 'angular';
import '@uirouter/angularjs';

import routing from './job-details.routing';

import dataProcessingJobDetailsComponent from './job-details.component';

const moduleName = 'ovhManagerDataProcessingSubmitJobComponent';

angular
  .module(moduleName, [
    'ui.router',
  ])
  .config(routing)
  .component('dataProcessingJobDetailsComponent', dataProcessingJobDetailsComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

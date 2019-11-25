import angular from 'angular';
import '@uirouter/angularjs';

import routing from './job-details.routing';

import dataProcessingJobDetailsComponent from './job-details.component';
import jobStatus from '../job-status';
import terminateJob from './terminate-job';

const moduleName = 'ovhManagerDataProcessingSubmitJobComponent';

angular
  .module(moduleName, [
    'ui.router',
    jobStatus,
    terminateJob,
  ])
  .config(routing)
  .component('dataProcessingJobDetailsComponent', dataProcessingJobDetailsComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

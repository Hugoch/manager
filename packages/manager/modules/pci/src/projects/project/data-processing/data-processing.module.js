import angular from 'angular';
import '@ovh-ux/ng-ovh-swimming-poll';

import routing from './data-processing.routing';
import dataProcessingComponent from './data-processing.component';
import dataProcessingService from './data-processing.service';
import submitJob from './submit-job';
import jobDetails from './job-details';

const moduleName = 'ovhManagerDataProcessingComponent';

angular
  .module(moduleName, [
    'ngOvhSwimmingPoll',
    submitJob,
    jobDetails,
  ])
  .config(routing)
  .component('dataProcessingComponent', dataProcessingComponent)
  .service('dataProcessingService', dataProcessingService)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

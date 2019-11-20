import angular from 'angular';
import '@ovh-ux/ng-ovh-swimming-poll';

import routing from './data-processing.routing';
import dataProcessingComponent from './data-processing.component';
import dataProcessingService from './data-processing.service';
import submitJob from './submit-job';

const moduleName = 'ovhManagerDataProcessingComponent';

console.log('MODULE');

angular
  .module(moduleName, [
    'ngOvhSwimmingPoll',
    submitJob,
  ])
  .config(routing)
  .component('dataProcessingComponent', dataProcessingComponent)
  .service('dataProcessingService', dataProcessingService)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

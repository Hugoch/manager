import angular from 'angular';
import '@uirouter/angularjs';

import routing from './job-dashboard.routing';

import PciStoragesContainersService from '../../../storages/containers/containers.service';
import dataProcessingJobDetailsComponent from './job-dashboard.component';
import jobStatus from '../../job-status';
import terminateJob from './terminate-job';
import jobLogs from '../job-logs';

const moduleName = 'ovhManagerDataProcessingJobDetailsDashboardComponent';

angular
  .module(moduleName, [
    'ui.router',
    jobStatus,
    terminateJob,
    jobLogs,
  ])
  .config(routing)
  .component('dataProcessingJobDetailsDashboardComponent', dataProcessingJobDetailsComponent)
  .service('PciStoragesContainersService', PciStoragesContainersService)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

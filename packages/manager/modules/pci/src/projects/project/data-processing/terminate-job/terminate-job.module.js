import angular from 'angular';
import ngTranslateAsyncLoader from '@ovh-ux/ng-translate-async-loader';
import uiRouter from '@uirouter/angularjs';
import angularTranslate from 'angular-translate';
import 'ovh-ui-angular';

import component from './terminate-job.component';
import routing from './terminate-job.routing';

const moduleName =
  'ovhManagerPciProjectDataProcessingQuickTerminateModalComponentLazyLoading';

angular
  .module(moduleName, [
    angularTranslate,
    ngTranslateAsyncLoader,
    'oui',
    uiRouter,
  ])
  .config(routing)
  .component('pciProjectDataProcessingQuickTerminateJobModal', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

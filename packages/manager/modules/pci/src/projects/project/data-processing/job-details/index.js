import angular from 'angular';
import '@uirouter/angularjs';
import 'oclazyload';

const moduleName = 'ovhManagerDataProcessingJobDetails';

angular
  .module(moduleName, [
    'ui.router',
    'oc.lazyLoad',
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider.state('pci.projects.project.data-processing.job-details.**', {
      url: '/:jobId',
      lazyLoad: ($transition$) => {
        const $ocLazyLoad = $transition$.injector()
          .get('$ocLazyLoad');
        return import('./job-details.module')
          .then(mod => $ocLazyLoad.inject(mod.default || mod));
      },
    });
  });

export default moduleName;

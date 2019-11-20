import angular from 'angular';
import '@uirouter/angularjs';
import 'oclazyload';

const moduleName = 'ovhManagerDataProcessingSubmitJob';

angular
  .module(moduleName, [
    'ui.router',
    'oc.lazyLoad',
  ])
  .config(/* @ngInject */($stateProvider) => {
    $stateProvider.state('pci.projects.project.data-processing.submit-job.**', {
      url: '/submit-job',
      lazyLoad: ($transition$) => {
        const $ocLazyLoad = $transition$.injector()
          .get('$ocLazyLoad');
        return import('./submit-job.module')
          .then(mod => $ocLazyLoad.inject(mod.default || mod));
      },
    });
  });

export default moduleName;
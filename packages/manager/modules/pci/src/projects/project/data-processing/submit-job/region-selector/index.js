import angular from 'angular';
import '@uirouter/angularjs';

import regionsList from '../../../../../components/project/regions-list';
import regionSelectorComponent from './region-selector.component';

const moduleName = 'ovhManagerDataProcessingSubmitJobRegionSelectorComponent';

console.log('region-selector :: module');

angular
  .module(moduleName, [
    'ui.router',
    regionsList,
  ])
  .component('dataProcessingSubmitJobRegionSelectorComponent', regionSelectorComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

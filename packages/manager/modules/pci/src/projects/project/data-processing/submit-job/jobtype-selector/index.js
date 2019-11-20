import angular from 'angular';
import '@uirouter/angularjs';

import jobTypeSelectorComponent from './jobtype-selector.component';

const moduleName = 'ovhManagerDataProcessingSubmitJobTypeSelector';

console.log('jobtype-selector :: index');

angular
  .module(moduleName, [
    'ui.router',
  ])
  .component('dataprocessingSubmitJobTypeSelector', jobTypeSelectorComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

import angular from 'angular';
import '@uirouter/angularjs';

import SparkConfigComponent from './spark-config.component';

const moduleName = 'ovhManagerDataProcessingSubmitJobSparkConfig';

angular
  .module(moduleName, [
    'ui.router',
  ])
  .component('dataprocessingSubmitJobSparkConfig', SparkConfigComponent)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

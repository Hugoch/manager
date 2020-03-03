import angular from 'angular';
import '@uirouter/angularjs';

import SparkSizingComponent from './spark-sizing.component';

const moduleName = 'ovhManagerPciProjectDataProcessingSubmitJobSparkSizing';

angular
  .module(moduleName, ['ui.router'])
  .component(
    'pciProjectDataProcessingSubmitJobSparkSizing',
    SparkSizingComponent,
  )
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;

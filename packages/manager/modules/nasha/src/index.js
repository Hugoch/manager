import angular from 'angular';

import '@ovh-ux/manager-core';
import '@ovh-ux/ng-ovh-cloud-universe-components';
import '@ovh-ux/ng-ovh-doc-url';
import '@ovh-ux/ng-ovh-responsive-popover';

import '@uirouter/angularjs';
import 'angular-translate';
import 'angular-ui-bootstrap';
import 'ovh-api-services';
import 'ovh-ui-angular';

import NashaCtrl from './controller';
import NashaAddCtrl from './add/nasha-add.controller';
import NashaOrderCompleteCtrl from './order/controller';
import NashaUnavailableCtrl from './add/nasha-unavailable.controller';

import informationTemplate from './information/nasha-information.html';
import orderTemplate from './order/template.html';
import usageHelpTemplate from './information/nasha-information-usage-help.html';

import NashaAddService from './add/nasha-add.service';
import partition from './partition';
import routing from './routing';

import './styles.less';
import 'ovh-ui-kit-bs/dist/ovh-ui-kit-bs.css';
import 'ovh-ui-kit/dist/oui.css';
import './add/styles.less';

const moduleName = 'ovhManagerNasha';

angular
  .module(moduleName, [
    'ovhManagerCore',
    'pascalprecht.translate',
    'ui.router',
    'ovh-api-services',
    'ngOvhCloudUniverseComponents',
    'ngOvhDocUrl',
    'ui.bootstrap',
    'oui',
    'ngOvhResponsivePopover',
    partition,
  ])
  .config(routing)
  .controller('NashaCtrl', NashaCtrl)
  .controller('NashaAddCtrl', NashaAddCtrl)
  .controller('NashaOrderCompleteCtrl', NashaOrderCompleteCtrl)
  .controller('NashaUnavailableCtrl', NashaUnavailableCtrl)
  .service('NashaAddService', NashaAddService)
  .run(/* @ngTranslationsInject:json ./translations */)
  .run(/* @ngInject */ ($templateCache) => {
    $templateCache.put('nasha/information/nasha-information.html', informationTemplate);
    $templateCache.put('nasha/information/nasha-information-usage-help.html', usageHelpTemplate);
    $templateCache.put('nasha/order/template.html', orderTemplate);
  });

export default moduleName;

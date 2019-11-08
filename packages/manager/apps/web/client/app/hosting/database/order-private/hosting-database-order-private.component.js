import controller from './hosting-database-order-private.controller';
import template from './hosting-database-order-private.html';

export default {
  controller,
  template,
  bindings: {
    checkoutOrderCart: '<',
    getDatacenter: '<',
    goBack: '<',
    prepareOrderCart: '<',
    resetOrderCart: '<',

    autoPayWithPreferredPaymentMethod: '<',
    defaultPaymentMean: '<',

    catalogProducts: '<',
    datacenter: '<',
    products: '<',
    user: '<',
    serviceName: '<',
    services: '<',
  },
};

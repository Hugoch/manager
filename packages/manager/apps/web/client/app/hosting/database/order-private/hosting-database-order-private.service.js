import find from 'lodash/find';
import sortBy from 'lodash/sortBy';

import {
  CATALOG_PRODUCT,
} from './hosting-database-order-private.constant';

export default class HostingDatabaseOrderPrivateService {
  /* @ngInject */
  constructor(OvhHttp, OrderService) {
    this.OvhHttp = OvhHttp;
    this.OrderService = OrderService;
  }

  async getCatalogProducts(
    ovhSubsidiary,
    products,
  ) {
    if (!products || !products.length) {
      return [];
    }

    const { name, category } = CATALOG_PRODUCT;
    const catalog = await this.OrderService
      .getProductPublicCatalog(ovhSubsidiary, name);

    return products.map(
      item => find(catalog[category], { planCode: item.planCode }),
    );
  }

  async getServices() {
    const services = await this.OvhHttp.get('/hosting/web', {
      rootPath: 'apiv6',
    });

    return services.sort();
  }

  async getDatacenter(serviceName) {
    const { datacenter } = await this.OvhHttp.get('/hosting/web/{serviceName}', {
      rootPath: 'apiv6',
      urlParams: {
        serviceName,
      },
    });

    return datacenter;
  }

  async getProducts(cartId) {
    const result = await this.OrderService
      .getProductOffers(cartId, 'privateSQL');

    if (!result.length) {
      return undefined;
    }

    // Get RAM from the productName, and sort the results
    result.map((_product_) => {
      const product = _product_;
      const sortValue = parseInt(product.productName.replace('privatesql ', ''), 10);
      product.sortValue = sortValue;
      return product;
    });

    return sortBy(result, 'sortValue');
  }

  async prepareOrderCart(ovhSubsidiary) {
    const { cartId } = await this.OrderService
      .createNewCart(ovhSubsidiary);

    await this.OrderService
      .assignCart(cartId);

    return cartId;
  }

  async addItemToCart(
    cartId,
    datacenter,
    price,
    product,
    version,
  ) {
    const { itemId } = await this.OrderService
      .addProductToCart(cartId, 'privateSQL', {
        duration: price.duration,
        planCode: product.planCode,
        pricingMode: price.pricingMode,
        quantity: price.minimumQuantity,
      });

    await this.OrderService.addConfigurationItem(cartId, itemId, 'dc', datacenter);
    await this.OrderService.addConfigurationItem(cartId, itemId, 'engine', version);

    return this.OrderService.getCheckoutInformations(cartId);
  }

  resetOrderCart(cartId) {
    return this.OrderService.deleteAllItems(cartId);
  }

  checkoutOrderCart(
    autoPayWithPreferredPaymentMethod,
    cartId,
  ) {
    return this.OrderService.checkoutCart(cartId, {
      autoPayWithPreferredPaymentMethod,
    });
  }
}

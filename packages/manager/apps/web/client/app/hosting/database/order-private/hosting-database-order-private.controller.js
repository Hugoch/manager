import get from 'lodash/get';
import find from 'lodash/find';
import sortBy from 'lodash/sortBy';

export default class HostingDatabaseOrderPrivateCtrl {
  /* @ngInject */
  constructor($filter, $timeout, $translate) {
    this.$filter = $filter;
    this.$timeout = $timeout;
    this.$translate = $translate;
  }

  checkout() {
    this.checkoutLoading = true;

    this.checkoutOrderCart(
      this.autoPayWithPreferredPaymentMethod,
      this.cartId,
    );
  }

  async initDurationStep() {
    this.durationLoading = true;

    // Reset cart if there is one
    if (this.cart) {
      await this.resetOrderCart();
      this.cart = undefined;
    }

    // Sort prices
    const prices = this.catalogProduct.pricings;
    this.$timeout(() => {
      this.catalogProduct.pricings = sortBy(prices, 'price');
      this.durationLoading = false;
    });
  }

  getDuration(_interval_) {
    const interval = _interval_.toString();
    const duration = this.$filter('wucDuration')(interval, 'longDate');

    return duration;
  }

  getVersions(product) {
    this.catalogProduct = find(this.catalogProducts, { planCode: product.planCode });
    const versions = find(this.catalogProduct.configurations, { name: 'engine' });

    if (!versions || !versions.values) {
      return [];
    }

    return versions.values.sort().map((version) => {
      const name = `hosting_database_order_private_version_value_${version.replace('.', '')}`;
      const translation = this.$translate.instant(name);

      return {
        name: (translation === name)
          ? version
          : translation,
        value: version,
      };
    });
  }

  async prepareCheckout() {
    if (!this.cart && !this.checkoutLoading) {
      this.checkoutLoading = true;
      const { cart, cartId } = await this.prepareOrderCart(
        this.order.datacenter,
        this.order.price,
        this.order.product,
        this.order.version.value,
      );

      this.$timeout(() => {
        this.cart = cart;
        this.cartId = cartId;
        this.checkoutLoading = false;
      });
    }
  }

  async updateDatacenter(serviceName) {
    this.durationLoading = true;
    const datacenter = await this.getDatacenter(serviceName);
    this.order.datacenter = datacenter;
    this.durationLoading = false;
  }

  updateProductPrice(interval) {
    const prices = get(this.order, 'product.prices');
    this.order.price = find(prices, { interval });
  }

  updateVersionSelector(product) {
    this.versions = this.getVersions(product);
  }

  $onInit() {
    // For now, there is only one 'type' choice
    // So we skip the first step
    this.order = {
      datacenter: this.datacenter,
      type: 'privateSQL',
    };

    this.currentIndex = 1;
  }
}

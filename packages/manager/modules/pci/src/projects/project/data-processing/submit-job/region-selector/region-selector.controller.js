export default class {
  constructor() {
    console.log('region-selector :: component');
  }

  /**
   * Handle component region change
   * @param region user-selected region
   */
  onChange(region) {
    console.log(region);
    this.onChangeHandler(region);
  }
}

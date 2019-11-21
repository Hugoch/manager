export default class {
  /* @ngInject */
  constructor($translate) {
    this.$translate = $translate;
    // define available compute engines. TODO this should be in /capabilities
    this.availableEngines = [
      {
        id: 'spark',
        name: 'Spark',
        description: $translate.instant('data_processing_submit_job_spark_description'),
      },
      {
        id: 'pyspark',
        name: 'PySpark',
        description: $translate.instant('data_processing_submit_job_pyspark_description'),
      },
    ];
  }

  /**
   * Handle change events
   */
  onChange({ id }) {
    this.onChangeHandler(id);
  }
}

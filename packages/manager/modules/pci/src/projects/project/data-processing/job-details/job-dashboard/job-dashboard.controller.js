import { find, unzip } from 'lodash';
import {
  DATA_PROCESSING_STATUS_TO_CLASS, DATA_PROCESSING_STATUSES,
  DATA_PROCESSING_UI_URL,
} from '../../data-processing.constants';

export default class {
  /* @ngInject */
  constructor($scope, $state, $resource, $uibModal, CucCloudMessage, dataProcessingService,
    CucRegionService, PciStoragesContainersService) {
    this.$scope = $scope;
    this.$state = $state; // router state
    this.cucCloudMessage = CucCloudMessage;
    this.dataProcessingService = dataProcessingService;
    this.cucRegionService = CucRegionService;
    this.DATA_PROCESSING_STATUS_TO_CLASS = DATA_PROCESSING_STATUS_TO_CLASS;
    this.DATA_PROCESSING_UI_URL = DATA_PROCESSING_UI_URL;
    this.containerService = PciStoragesContainersService;
    this.containerId = null;
    this.warp10 = $resource('https://warp10.gra1.metrics.ovh.net/api/v0/exec', {}, {
      query: {
        method: 'POST',
        transformRequest: [],
        isArray: true,
      },
    });
    this.metricsMemory = {
      data: [[1, 2, 3]],
      labels: ['0', '1', '2'],
    };
  }

  $onInit() {
    // retrieve container id for the job
    this.containerService.getAll(this.projectId)
      .then((containers) => {
        const container = find(containers, c => c.name === this.job.containerName);
        if (container !== undefined) {
          this.containerId = container.id;
        }
      });
    console.log(this.metricsToken.data.token);
    this.queryMetricsMemory();
  }

  queryMetricsMemory() {
    this.warp10
      .query(`[ '${this.metricsToken.data.token}' 'spark_jvm_memory_usage' { 'qty' 'used' 'mem_type' 'total' 'job-id' '${this.job.id}' } NOW 4 h ] FETCH [ SWAP [ 'executor-id' ] reducer.sum ] REDUCE`)
      .$promise
      .then((series) => {
        let data = series[0][0].v;
        data = unzip(data);
        console.log(data);
        this.metricsMemory = {
          labels: data[0],
          data: data[1],
        };
      });
  }

  /**
   * Load a modal asking confirmation to terminate current job
   */
  terminateJob() {
    this.$state.go('pci.projects.project.data-processing.job-details.dashboard.terminate', {
      projectId: this.projectId,
      jobId: this.job.id,
      jobName: this.job.name,
    });
  }

  showBillingConsole() {
    this.$state.go('pci.projects.project.billing', { projectId: this.projectId });
  }

  browseObjectStorage() {
    this.$state.go('pci.projects.project.storages.objects.object', {
      projectId: this.projectId,
      containerId: this.containerId,
    });
  }

  isJobRunning() {
    return [DATA_PROCESSING_STATUSES.PENDING, DATA_PROCESSING_STATUSES.RUNNING,
      DATA_PROCESSING_STATUSES.SUBMITTED].includes(this.job.status);
  }
}

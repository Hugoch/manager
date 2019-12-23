export default /* @ngInject */$stateProvider => $stateProvider.state(
  'pci.projects.project.data-processing', {
    cache: false,
    url: '/data-processing',
    component: 'dataProcessingComponent',
    redirectTo: transition => Promise.all([
      transition.injector()
        .getAsync('activations'),
    ])
      .then(([activations]) => {
        if (activations.data.length === 0) {
          return { state: 'pci.projects.project.data-processing.onboarding' };
        }
        return false;
      }),
    resolve: {
      breadcrumb: /* @ngInject */ $translate => $translate.instant('data_processing_title'),
      activations: /* @ngInject */ (dataProcessingService,
        projectId) => dataProcessingService.getActivations(projectId),
      jobs: /* @ngInject */ (dataProcessingService,
        projectId) => dataProcessingService.getJobs(projectId),
      submitJob: /* @ngInject */ ($state, projectId) => () => $state.go('pci.projects.project.data-processing.submit-job', { projectId }),
      showJob: /* @ngInject */ ($state, projectId) => jobId => $state.go('pci.projects.project.data-processing.job-details.dashboard', {
        projectId,
        jobId,
      }),
      lab: /* @ngInject */(PciProjectLabsService, projectId) => PciProjectLabsService.getLabByName(projectId, 'ioStream'), // FIXME REPLACE WITH DATAPROCESSING
    },
  },
);

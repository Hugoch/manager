export default /* @ngInject */($stateProvider) => {
  console.log('ROUTING');
  return $stateProvider.state('pci.projects.project.data-processing', {
    cache: false,
    url: '/data-processing',
    component: 'dataProcessingComponent',
    // redirectTo: transition => transition
    //   .injector()
    //   .getAsync('jobs')
    //   .then(() => false),
    resolve: {
      breadcrumb: /* @ngInject */ $translate => $translate.instant('data_processing_title'),
      jobs: /* @ngInject */ (dataProcessingService, projectId) => {
        console.log('GET JOBS');
        return dataProcessingService.getJobs(projectId);
      },
      submitJob: /* @ngInject */ ($state, projectId) => () => $state.go('pci.projects.project.data-processing.submit-job', { projectId }),
    },
  });
};

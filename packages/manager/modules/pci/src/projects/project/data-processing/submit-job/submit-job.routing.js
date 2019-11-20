export default /* @ngInject */($stateProvider) => {
  return $stateProvider.state('pci.projects.project.data-processing.submit-job', {
    url: '/submit-job',
    component: 'dataProcessingSubmitJobComponent',
    resolve: {
      breadcrumb: /* @ngInject */ $translate => $translate.instant('data_processing_submit_job_title'),
    },
  });
};

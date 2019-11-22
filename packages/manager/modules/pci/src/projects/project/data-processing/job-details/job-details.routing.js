export default /* @ngInject */$stateProvider => $stateProvider.state('pci.projects.project.data-processing.job-details', {
  url: '/:jobId',
  component: 'dataProcessingJobDetailsComponent',
  resolve: {
    jobId: $transition$ => $transition$.params().jobId, // retrieve job id from url params
    job: ( // retrieve job from service
      dataProcessingService,
      jobId,
    ) => dataProcessingService.getJob(jobId),
    breadcrumb: job => job.name, // update breadcrumb with job id
  },
});

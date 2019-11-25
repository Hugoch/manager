export default /* @ngInject */$stateProvider => $stateProvider.state('pci.projects.project.data-processing.job-details', {
  url: '/:jobId',
  component: 'dataProcessingJobDetailsComponent',
  resolve: {
    // retrieve project id from url params
    projectId: $transition$ => $transition$.params().projectId,
    // retrieve job id from url params
    jobId: $transition$ => $transition$.params().jobId,
    job: ( // retrieve job from service
      dataProcessingService,
      jobId,
    ) => dataProcessingService.getJob(jobId),
    breadcrumb: job => job.name, // update breadcrumb with job id
  },
});

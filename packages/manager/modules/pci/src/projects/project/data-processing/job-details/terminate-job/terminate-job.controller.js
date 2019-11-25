export default class {
  /* @ngInject */
  constructor($state) {
    this.$state = $state;
  }

  dismissModal() {
    this.closeModal();
  }

  closeModal() {
    console.log(this.jobId,this.jobName)
    this.$state.go('pci.projects.project.data-processing.job-details', { projectId: this.projectId });
  }
}

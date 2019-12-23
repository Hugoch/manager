import reduce from 'lodash/reduce';
import illustration from './assets/data-processing.png';
import { GUIDES } from './onboarding.constants';

export default class {
  /* @ngInject */
  constructor($translate, $state, dataProcessingService) {
    this.$translate = $translate;
    this.dataProcessingService = dataProcessingService;
    this.$state = $state;
  }

  $onInit() {
    this.illustration = illustration;
    this.isActivated = this.lab.isActivated();
    this.agreedBeta = false;
    this.guides = reduce(
      GUIDES,
      (list, guide) => ([
        ...list,
        {
          ...guide,
          title: this.$translate.instant(
            `data_processing_onboarding_guides_${guide.id}_title`,
          ),
          description: '',
        },
      ]),
      [],
    );
  }

  acceptLab(accepted) {
    this.agreedBeta = accepted;
  }

  activateService() {
    this.dataProcessingService.activate(this.projectId)
      .then(() => {
        this.$state.go('pci.projects.project.data-processing', {}, { reload: true });
      });
  }
}

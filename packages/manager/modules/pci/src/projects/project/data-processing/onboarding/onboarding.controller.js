import reduce from 'lodash/reduce';
import illustration from './assets/data-processing.png';
import { BETA_CONTRACT_LINK, GUIDES } from './onboarding.constants';

export default class {
  /* @ngInject */
  constructor(
    $translate,
  ) {
    this.$translate = $translate;
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
}

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('telecom.telephony.alias.portabilities', {
    url: '/portabilities',
    views: {
      'aliasView@telecom.telephony.alias': 'portabilities',
    },
    translations: { value: ['.'], format: 'json' },
    resolve: {
      billingAccount: /* @ngInject */ $transition$ => $transition$.params().billingAccount,
      attachMandate: /* @ngInject */ ($state, billingAccount) => portability => $state.go('telecom.telephony.alias.portabilities.attach', {
        billingAccount,
        portabilityId: portability.id,
      }),
      goToPortabilities: /* @ngInject */ ($state, billingAccount, TucToast) => (message = false, type = 'success') => {
        const reload = message && type === 'success';

        const promise = $state.go('telecom.telephony.alias.portabilities', {
          billingAccount,
        },
        {
          reload,
        });

        if (message) {
          promise.then(() => {
            TucToast[type](message);
          });
        }

        return promise;
      },
    },
  });
};

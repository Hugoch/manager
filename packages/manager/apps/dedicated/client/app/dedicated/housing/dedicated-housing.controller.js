import assign from 'lodash/assign';

angular.module('App').controller('HousingCtrl', [
  '$scope',
  '$stateParams',
  '$timeout',
  '$translate',
  'Alerter',
  'constants',
  'Housing',
  'ovhUserPref',
  'User',
  function HousingCtrl(
    $scope,
    $stateParams,
    $timeout,
    $translate,
    Alerter,
    constants,
    Housing,
    ovhUserPref,
    User,
  ) {
    $scope.loadingHousingInformations = true;
    $scope.loadingHousingError = false;
    $scope.housingPhoneStopBother = true;
    $scope.housingPhoneNumber = constants.urls.FR.housingPhoneSupport;
    $scope.disable = {
      reboot: false,
    };
    $scope.housing = {};

    function checkIfStopBotherHousingPhone() {
      return ovhUserPref
        .getValue('HOUSING_SUPPORT_PHONE_STOP_BOTHER')
        .then((stopBother) => {
          $scope.housingPhoneStopBother = stopBother;
        })
        .catch(() => {
          $scope.housingPhoneStopBother = false;
        });
    }

    function init() {
      Housing.getSelected($stateParams.productId)
        .then((informations) => {
          $scope.housing = assign($scope.housing, informations);
          return Housing.getDescription($stateParams.productId);
        })
        .then((description) => {
          $scope.housing = assign($scope.housing, description);
          $scope.housing.isExpired = moment(description.expiration).isBefore(moment());
          $scope.housing.serviceInfos = description;
          $scope.loadingHousingInformations = false;
        })
        .catch((err) => {
          Alerter.alertFromSWS($translate.instant('housing_tab_stats_failure_load'), err, 'housing_dashboard_alert');
          $scope.loadingHousingError = true;
        });

      User.getUser().then((user) => {
        $scope.user = user;
        checkIfStopBotherHousingPhone();
      });

      User.getUrlOf('changeOwner').then((link) => {
        $scope.changeOwnerUrl = link;
      });

      Housing.getOrderableApc($stateParams.productId).then((data) => {
        $scope.disable.reboot = !(data.free && data.orderable);
        $scope.housing.apc = data;
      });
    }

    $scope.setToBigModalDialog = function setToBigModalDialog(active) {
      $scope.bigModalDialog = active;
    };

    $scope.resetAction = function resetAction() {
      $scope.setAction(false);
      $scope.setToBigModalDialog(false);
    };

    $scope.setAction = function setAction(action, data) {
      if (action) {
        $scope.currentAction = action;
        $scope.currentActionData = data;
        $scope.stepPath = `dedicated/housing/${$scope.currentAction}.html`;

        $('#currentAction').modal({
          keyboard: true,
          backdrop: 'static',
        });
      } else {
        $('#currentAction').modal('hide');
        $scope.currentActionData = null;
        $timeout(() => {
          $scope.stepPath = '';
        }, 300);
      }
    };

    $scope.createStopBotherUserPref = function createStopBotherUserPref() {
      ovhUserPref.create('HOUSING_SUPPORT_PHONE_STOP_BOTHER', true);
    };

    init();
  },
]);

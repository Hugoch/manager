import template from './overview.html';
import controller from './overview.controller';

export default {
  bindings: {
    clusterDetails: '<',
    clusterType: '<',
    createCluster: '<',
    endPoints: '<',
    gettingStarted: '<',
    goToChangeName: '<',
    goToClusterSize: '<',
    getMyServicesURL: '<',
    goToClusterNodes: '<',
    goToSettings: '<',
    goToUpdatePassword: '<',
    hosts: '<',
    offerDetails: '<',
    serviceInfo: '<',
  },
  controller,
  template,
};
import { uniqBy } from 'lodash';

export default class JobLogsService {
  /* @ngInject */
  constructor($timeout, $q) {
    this.logs = [];
    this.$timeout = $timeout;
    this.$q = $q;
  }

  /**
   * Create a timer polling jobs for given job
   * @param jobId Id of the job get logs from
   * @param interval Polling interval in ms
   */
  startLogsPolling(jobId, interval = 5000) {
    this.pollLogs(jobId)
      .then((logs) => {
        this.logs = logs;
      });
    this.timer = this.$timeout(() => this.pollLogs(jobId)
      .then((logs) => {
        this.logs = logs;
        if (Array.isArray(this.logs)) {
          this.startLogsPolling(jobId, interval);
        }
      }), interval);
  }

  /**
   * Stop polling jobs
   */
  stopLogsPolling() {
    if (this.timer) {
      this.$timeout.cancel(this.timer);
    }
  }

  /**
   * Poll logs for given job from API, dedupe entries if needed
   * @param jobId Job ID
   * @return {*}
   */
  pollLogs(jobId) {
    console.log('poll');
    return this.$q((resolve) => {
      resolve({
        logs: [
          {
            timestamp: '2019-11-26T02:00:05.93792808Z',
            content: 'Starting Vault Backup',
          },
          {
            timestamp: '2019-11-26T02:00:11.243602676Z',
            content: 'Success! You are now authenticated. The token information displayed below',
          },
          {
            timestamp: '2019-11-26T02:00:11.244251444Z',
            content: 'is already stored in the token helper. You do NOT need to run "vault login"',
          },
          {
            timestamp: '2019-11-26T02:00:11.244705247Z',
            content: 'again. Future Vault requests will automatically use this token.',
          },
          {
            timestamp: '2019-11-26T02:00:11.244739226Z',
            content: '',
          },
          {
            timestamp: '2019-11-26T02:00:11.24515053Z',
            content: 'Key                     Value',
          },
          {
            timestamp: '2019-11-26T02:00:11.24548485Z',
            content: '---                     -----',
          },
          {
            timestamp: '2019-11-26T02:00:11.246018798Z',
            content: 'token                   xxxx',
          },
          {
            timestamp: '2019-11-26T02:00:11.246335222Z',
            content: 'token_accessor          xxxx',
          },
          {
            timestamp: '2019-11-26T02:00:11.246559907Z',
            content: 'token_duration          768h',
          },
          {
            timestamp: '2019-11-26T02:00:11.246836361Z',
            content: 'token_renewable         true',
          },
          {
            timestamp: '2019-11-26T02:00:11.247128279Z',
            content: 'token_policies          ["api" "default"]',
          },
          {
            timestamp: '2019-11-26T02:00:11.247309818Z',
            content: 'identity_policies       []',
          },
          {
            timestamp: '2019-11-26T02:00:11.24760079Z',
            content: 'policies                ["api" "default"]',
          },
          {
            timestamp: '2019-11-26T02:00:11.247825769Z',
            content: 'token_meta_role_name    backup',
          },
          {
            timestamp: '2019-11-26T02:00:14.620739279Z',
            content: '  adding: vault-dump/ (stored 0%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.621809612Z',
            content: '  adding: vault-dump/services-ovh-internal-core.txt (deflated 72%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.622417632Z',
            content: '  adding: vault-dump/connectors-openstack-keystone-core.txt (deflated 70%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.622704357Z',
            content: '  adding: vault-dump/services-atelier-core.txt (deflated 38%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.623647477Z',
            content: '  adding: vault-dump/services-adp-core.txt (deflated 49%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.623834912Z',
            content: '  adding: vault-dump/connectors-mail-core.txt (deflated 42%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.62410159Z',
            content: '  adding: vault-dump/connectors-ovh-apiv6-core.txt (deflated 46%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.6248001Z',
            content: '  adding: vault-dump/connectors-k8s-core.txt (deflated 71%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.625359327Z',
            content: '  adding: vault-dump/services-dataconvergence-project-manager-core.txt (deflated 64%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.625839712Z',
            content: '  adding: vault-dump/connectors-couchbase-core.txt (deflated 53%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.626286919Z',
            content: '  adding: vault-dump/microservice-analytics.txt (deflated 69%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.626805425Z',
            content: '  adding: vault-dump/microservice-dataconvergence-project-manager.txt (deflated 70%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.627372974Z',
            content: '  adding: vault-dump/services-collector-core.txt (deflated 61%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.62781318Z',
            content: '  adding: vault-dump/connectors-openstack-core.txt (deflated 60%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.628197757Z',
            content: '  adding: vault-dump/microservice-ovh-internal.txt (deflated 69%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.628607055Z',
            content: '  adding: vault-dump/connectors-tcpeventbusbridge.txt (deflated 46%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.629083919Z',
            content: '  adding: vault-dump/api-gateway.txt (deflated 40%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.629509365Z',
            content: '  adding: vault-dump/microservice-lookatch-agent.txt (deflated 73%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.629843076Z',
            content: '  adding: vault-dump/api-swagger.txt (deflated 41%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.630347904Z',
            content: '  adding: vault-dump/microservice-openstack-internal.txt (deflated 66%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.630764036Z',
            content: '  adding: vault-dump/microservice-atelier.txt (deflated 71%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.630994325Z',
            content: '  adding: vault-dump/connectors-vault-core.txt (deflated 44%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.631264957Z',
            content: '  adding: vault-dump/api-auth-core.txt (deflated 50%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.631513948Z',
            content: '  adding: vault-dump/api-healthcheck-monitoring.txt (deflated 35%)',
          },
          {
            timestamp: '2019-11-26T02:00:14.654674231Z',
            content: 'Creating swift container vaultbackup in region GRA5',
          },
          {
            timestamp: '2019-11-26T02:00:18.290814693Z',
            content: 'uploading vault-backup-api-conf-2019-11-26-02:00.zip in swift container vaultbackup',
          },
          {
            timestamp: '2019-11-26T02:00:20.058702624Z',
            content: 'production/vault-backup-api-conf-2019-11-26-02:00.zip.asc',
          },
          {
            timestamp: '2019-11-26T02:00:20.158066276Z',
            content: 'Backup done.',
          },
          {
            timestamp: '2019-11-26T02:00:20.158158807Z',
            content: 'Starting Backup cycling.',
          },
          {
            timestamp: '2019-11-26T02:00:20.158178104Z',
            content: 'Delete all backups for vault path: api/conf in namespace: production created over 5 days ago',
          },
          {
            timestamp: '2019-11-26T02:00:21.396108951Z',
            content: 'Deleting  production/vault-backup-api-conf-2019-11-21-02:00.zip.asc',
          },
          {
            timestamp: '2019-11-26T02:00:22.624093945Z',
            content: 'production/vault-backup-api-conf-2019-11-21-02:00.zip.asc',
          },
          {
            timestamp: '2019-11-26T02:00:22.808928289Z',
            content: 'Backup cycling done.',
          },
          {
            timestamp: '2019-11-26T02:00:22.838427343Z',
            content: '  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current',
          },
          {
            timestamp: '2019-11-26T02:00:22.83855139Z',
            content: '                                 Dload  Upload   Total   Spent    Left  Speed',
          },
          {
            timestamp: '2019-11-26T02:00:22.874539932Z',
            content: '\r  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0\r100    99    0     0  100    99      0   2643 --:--:-- --:--:-- --:--:--  2675',
          },
          {
            timestamp: '2019-11-26T02:00:22.877814812Z',
            content: 'Vault Backup done with: 0 error(s)',
          },
        ],
      });
    })
      .then((data) => {
        if (!Array.isArray(data.logs)) {
          return {
            swiftUrl: data,
          };
        }
        // dedupe messages. Implementation ensures maintained order.
        this.logs = uniqBy([...this.logs, ...data.logs], item => item.timestamp);
        this.logs.push({
          timestamp: '2019-11-27T02:00:22.' + Math.random(),
          content: 'BLABLA',
        });
        return this.logs;
      });
  }
}

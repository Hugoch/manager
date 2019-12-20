import { uniqBy } from 'lodash';
import moment from 'moment';

export default class JobLogsService {
  /* @ngInject */
  constructor($timeout, $translate, dataProcessingService) {
    this.logs = {
      logs: [{
        timestamp: moment()
          .toISOString(),
        content: $translate.instant('data_processing_details_logs_default_message')
      }],
      logsAddress: null,
    };
    this.$timeout = $timeout;
    this.dataProcessingService = dataProcessingService;
  }

  /**
   * Create a timer polling jobs for given job
   * @param projectId Id of the project containing the job
   * @param jobId Id of the job get logs from
   * @param interval Polling interval in ms
   * @param firstPoll boolean Set to true to enable a first polling before timer
   */
  startLogsPolling(projectId, jobId, interval = 5000, firstPoll = false) {
    const from = `now-${interval / 1000}s`;
    if (firstPoll) {
      this.pollLogs(projectId, jobId, from)
        .then((logs) => {
          this.logs = logs;
        });
    }
    this.timer = this.$timeout(() => this.pollLogs(projectId, jobId, from)
      .then((logs) => {
        this.logs = logs;
        if (this.logs.logsAddress === null) {
          this.startLogsPolling(projectId, jobId, interval);
        }
        console.log(this.logs);
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
   * @param projectId string Project ID
   * @param jobId string Job ID
   * @param from string How long we want the logs from. eg. 'now-5s'
   * @return {*}
   */
  pollLogs(projectId, jobId, from) {
    //FIXME return this.dataProcessingService.getLogs(projectId, jobId, from)
    return this.dataProcessingService.getLogs(projectId, jobId)
      .then(data => ({
        ...data,
        // dedupe messages. Implementation ensures maintained order.
        logs: uniqBy([...this.logs.logs, ...data.logs], item => item.timestamp),
      }));
  }
}

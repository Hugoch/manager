export const DATA_PROCESSING_STATUS_TO_CLASS = Object.freeze({
  PENDING: 'warning',
  SUBMITTED: 'warning',
  RUNNING: 'info',
  FAILED: 'error',
  COMPLETED: 'success',
  TERMINATED: 'error',
});

export const DATA_PROCESSING_UI_URL = {
  GRA: 'https://adc.gra.dataconvergence.ovh.com/',
};

export default {
  DATA_PROCESSING_STATUS_TO_CLASS,
};

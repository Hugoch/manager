export default class {
  /* @ngInject */
  constructor() {
    this.colors = ['rgba(35,79,184,0.5)'];
    this.datasetOverride = {
      xAxisId: 'x-axis',
      yAxisId: 'y-axis',
      pointRadius: 10,
      pointBackgroundColor: 'rgba(255,0,0,1)',
      backgroundColor: 'rgba(255,0,0,1)',
      type: 'line',
    };
    this.options = {
      responsive: true,
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            id: 'y-axis',
            type: 'linear',
            display: false,
            position: 'left',
          },
        ],
        xAxes: [{
          id: 'x-axis',
          display: false,
          position: 'bottom',
        },
        ],
      },
    };
  }
}

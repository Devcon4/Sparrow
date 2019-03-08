import Chart from 'chart.js';
import ServiceProvider from './ServiceProvider';
import { fill, range, max } from 'lodash';
export default class GraphService {

  graphColors = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
  ];

  borderColors = [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ];

  public GetGraphForTOW(data: {[k: string]: number}): Chart.ChartConfiguration {
    let labels = Object.keys(data);
    let values = Object.values(data);
    return {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Cards',
                data: [1],
                backgroundColor: values.map((d, i) => this.graphColors[i%this.graphColors.length]),
                borderColor: values.map((d, i) => this.borderColors[i%this.borderColors.length]),
                borderWidth: 1
            }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            labels: {
              fontColor: 'white'
            }
          },
          scales: {
            yAxes: [{
              gridLines: {
                display: true,
                color: '#fff'
              },
              ticks: {
                beginAtZero:true,
                fontColor: 'white'
              }
            }],
            xAxes: [{
              gridLines: {
                display: true,
                color: '#fff'
              },
            }]
          }
        }
      };
    }
}
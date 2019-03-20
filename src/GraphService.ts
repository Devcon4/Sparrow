import Chart from 'chart.js';
import ServiceProvider from './ServiceProvider';
import { fill, range, max } from 'lodash';
export default class GraphService {

  /**
  Label = agency

  custom data fields
  who is assigned to the card
  what status the cards are in
  hopeful reports:
  # of tasks completed
  # of tasks per agency
              # of tasks per contract
  # of tasks per "Type of Work"
  ....
  Total time spent per TOW
  Total time spent per agency/project
  */

  graphColors = [
      'rgba(39, 153, 247, .5)',
      'rgba(17, 242, 182, .5)',
      'rgba(192, 38, 212, .5)',
      'rgba(255, 168, 31, .5)',
      'rgba(93, 179, 249, .5)',
      'rgba(77, 245, 200, .5)',
      'rgba(208, 92, 223, .5)',
      'rgba(255, 190, 87, .5)',
      'rgba(29, 115, 185, .5)',
      'rgba(13, 182, 137, .5)',
      'rgba(144, 29, 159, .5)',
      'rgba(191, 126, 23, .5)',
  ];

  borderColors = [
    'rgba(39, 153, 247, 1)',
    'rgba(17, 242, 182, 1)',
    'rgba(192, 38, 212, 1)',
    'rgba(255, 168, 31, 1)',
    'rgba(93, 179, 249, 1)',
    'rgba(77, 245, 200, 1)',
    'rgba(208, 92, 223, 1)',
    'rgba(255, 190, 87, 1)',
    'rgba(29, 115, 185, 1)',
    'rgba(13, 182, 137, 1)',
    'rgba(144, 29, 159, 1)',
    'rgba(191, 126, 23, 1)',
  ];

  public GetGraphForTasksPerAgency(data: {[k: string]: number} = {}): Chart.ChartConfiguration {
    let labels = Object.keys(data);
    let values = Object.values(data);
    let empty = new Array(...values.map(v => new Array(values.length)));

    return {
      type: 'bar',
        data: {
            labels: labels,
            datasets: [
              // ...values.map<Chart.ChartDataSets>((v, i) => ({
              //   label: labels[i],
              //   data: (empty[i][i] = v, empty[i]),
              //   backgroundColor: this.graphColors[i%this.graphColors.length],
              //   borderColor: this.borderColors[i%this.borderColors.length],
              //   borderWidth: 1
              // })),
              {
              label: '# of cards',
              data: values,
              backgroundColor: values.map((v, i) => this.graphColors[i%this.graphColors.length]),
              borderColor: values.map((v, i) => this.borderColors[i%this.borderColors.length]),
              borderWidth: 1
            }]
        },
        options: {
          cutoutPercentage: 60,
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 0,
              right: 0,
              bottom: 0,
              top: 0
            }
          },
          legend: {
            display: false,
            position: 'left',
            labels: {
              fontColor: 'white'
            }
          },
          scales: {
            yAxes: [{
              gridLines: {
                display: false,
                color: '#666'
              },
              ticks: {
                fontColor: 'white'
              }
            }],
            xAxes: [{

              gridLines: {
                display: false,
                color: '#fff'
              },
              ticks: {
                fontColor: 'white'
              }
            }]
          }
        }
    };
  }

  public GetGraphForTOW(data: {[k: string]: number} = {}): Chart.ChartConfiguration {
    let labels = Object.keys(data);
    let values = Object.values(data);
    let empty = new Array(...values.map(v => new Array(values.length)));

    return {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [
              // ...values.map<Chart.ChartDataSets>((v, i) => ({
              //   label: labels[i],
              //   data: (empty[i][i] = v, empty[i]),
              //   backgroundColor: this.graphColors[i%this.graphColors.length],
              //   borderColor: this.borderColors[i%this.borderColors.length],
              //   borderWidth: 1
              // })),
              {
              label: '# of cards',
              data: values,
              backgroundColor: values.map((v, i) => this.graphColors[i%this.graphColors.length]),
              borderColor: values.map((v, i) => this.borderColors[i%this.borderColors.length]),
              borderWidth: 1
            }]
        },
        options: {
          cutoutPercentage: 60,
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 0,
              right: 0,
              bottom: 0,
              top: 0
            }
          },
          legend: {
            position: 'left',
            labels: {
              fontColor: 'white'
            }
          },
          // scales: {
          //   yAxes: [{
          //     gridLines: {
          //       display: false,
          //       color: '#fff'
          //     },
          //     ticks: {
          //       fontColor: 'white'
          //     }
          //   }],
          //   xAxes: [{

          //     gridLines: {
          //       display: false,
          //       color: '#fff'
          //     },
          //     ticks: {
          //       fontColor: 'white'
          //     }
          //   }]
          // }
        }
      };
    }
}
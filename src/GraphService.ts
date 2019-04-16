import Chart from 'chart.js';
import ServiceProvider from './ServiceProvider';
import { fill, range, max } from 'lodash';
import Graph from './models/Graph';
import { GraphTypes } from './models/GraphTypes';

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

  static graphColors = [
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

  static borderColors = [
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

  public graphTypeToMethodMap = {
    [GraphTypes.CountPerAgency]: this.GetGraphForTasksPerAgency,
    [GraphTypes.CountPerTOW]: this.GetGraphForTOW,
  }

  public GetGraphForTool(data: {[k: string]: number} = {}): Graph {
    let labels = Object.keys(data);
    let values = Object.values(data);
    let empty = new Array(...values.map(v => new Array(values.length)));

    return new Graph({
      code: GraphTypes.CountPerTool,
      config: {
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
                backgroundColor: values.map((v, i) => GraphService.graphColors[i%GraphService.graphColors.length]),
                borderColor: values.map((v, i) => GraphService.borderColors[i%GraphService.borderColors.length]),
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
                  autoSkip: false,
                  fontColor: 'white'
                }
              }]
            }
          }
      }
    });
  }

  public GetGraphForType(data: {[k: string]: number} = {}): Graph {
    let labels = Object.keys(data);
    let values = Object.values(data);
    let empty = new Array(...values.map(v => new Array(values.length)));

    return new Graph({
      code: GraphTypes.CountPerType,
      config: {
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
                backgroundColor: values.map((v, i) => GraphService.graphColors[i%GraphService.graphColors.length]),
                borderColor: values.map((v, i) => GraphService.borderColors[i%GraphService.borderColors.length]),
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
                  autoSkip: false,
                  fontColor: 'white'
                }
              }]
            }
          }
      }
    });
  }

  public GetGraphForTasksPerAgency(data: {[k: string]: number} = {}): Graph {
    let labels = Object.keys(data);
    let values = Object.values(data);
    let empty = new Array(...values.map(v => new Array(values.length)));

    return new Graph({
      code: GraphTypes.CountPerAgency,
      config: {
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
                backgroundColor: values.map((v, i) => GraphService.graphColors[i%GraphService.graphColors.length]),
                borderColor: values.map((v, i) => GraphService.borderColors[i%GraphService.borderColors.length]),
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
                  autoSkip: false,
                  fontColor: 'white'
                }
              }]
            }
          }
      }
    });
  }

  public GetGraphForStatus(data: {[k: string]: number} = {}): Graph {
    let labels = Object.keys(data);
    let values = Object.values(data);
    let empty = new Array(...values.map(v => new Array(values.length)));

    return new Graph({
      code: GraphTypes.CountPerAgency,
      config: {
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
                backgroundColor: values.map((v, i) => GraphService.graphColors[i%GraphService.graphColors.length]),
                borderColor: values.map((v, i) => GraphService.borderColors[i%GraphService.borderColors.length]),
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
                  autoSkip: false,
                  fontColor: 'white'
                }
              }]
            }
          }
      }
    });
  }

  public GetGraphForCategory(data: {[k: string]: number} = {}): Graph {
    let labels = Object.keys(data).sort((a, b) => {
        var textA = a.toUpperCase();
        var textB = b.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    let values = Object.values(data).sort((a, b) => (a > b) ? -1 : (a > b) ? 1 : 0);
    let empty = new Array(...values.map(v => new Array(values.length)));

    return new Graph({
      code: GraphTypes.CountPerCategory,
      config: {
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
              backgroundColor: values.map((v, i) => GraphService.graphColors[i%GraphService.graphColors.length]),
              borderColor: values.map((v, i) => GraphService.borderColors[i%GraphService.borderColors.length]),
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
            display: true,
            position: 'left',
            labels: {
              fontColor: 'white'
            }
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                //get the concerned dataset
                var dataset = data.datasets[tooltipItem.datasetIndex];
                //calculate the total of this data set
                var total = (dataset.data as any).reduce((prev, curr) => prev += curr);
                //get the current items value
                var currentValue = dataset.data[tooltipItem.index] as number;
                //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
                var percentage = Math.floor(((currentValue/total) * 100)+0.5);
          
                return data.labels[tooltipItem.index] + ': ' + percentage + "%";
              }
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
      }
    });
  }

  public GetGraphForTOW(data: {[k: string]: number} = {}): Graph {
    let labels = Object.keys(data);
    let values = Object.values(data);
    let empty = new Array(...values.map(v => new Array(values.length)));

    return new Graph({
      code: GraphTypes.CountPerTOW,
      config: {
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
              backgroundColor: values.map((v, i) => GraphService.graphColors[i%GraphService.graphColors.length]),
              borderColor: values.map((v, i) => GraphService.borderColors[i%GraphService.borderColors.length]),
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
            display: true,
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
      }
    });
  }
}
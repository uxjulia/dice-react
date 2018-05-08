import React from 'react';
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import Chart from 'chart.js';

const chartSettings = {
  labels: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  datasets: [
    {
      label: "# of Dice Rolls",
      backgroundColor: "rgba(114,166,202,0.4)",
      borderColor: "rgba(114,166,202,.8)",
      data: []
    }
  ]
};

const config = {
  type: 'bar',
  data: chartSettings,
  options: {
    tooltipTemplate: "Total:",
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          stepSize: 1
        }
      }]
    }
  }
};

class Settings {
  @observable chartData = []
  @observable data = {
    labels: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        label: "# of Dice Rolls",
        backgroundColor: "rgba(114,166,202,0.4)",
        borderColor: "rgba(114,166,202,.8)",
        data: this.chartData
      }
    ]
  }
  @observable config = {
    type: 'bar',
    data: this.data,
    options: {
      tooltipTemplate: "Total:",
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            stepSize: 1
          }
        }]
      }
    }
  }
}


class DiceChart extends React.Component {
  constructor(props) {
    super(props)
    this.chart = React.createRef()
  }

  appState = new Settings()
  initChart = () => {
    const rolls = this.props.rolls;
    let ctx = this.chart.current;
    // this.appState.data.datasets[0].data = rolls;
    this.appState.chartData = rolls
    this.lineChart = new Chart(ctx, this.config);
  };

  componentDidMount(){
    this.initChart();
  };

  componentDidUpdate(){
    this.lineChart.update();
  }

  componentWillUnmount(){
    this.lineChart.destroy();
  }

  render(){
    return(
      <canvas id="chart" ref={this.chart}></canvas>
    )
  }
}

export default observer(DiceChart)
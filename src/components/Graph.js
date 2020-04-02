import React from 'react';
import randomColor from 'randomcolor';
import { Pie } from 'react-chartjs-2';

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      myQuery: [],
      labels: [],
      dataset: []
    };
  }

  componentDidMount() {
    fetch('https://api.metamug.com/covid/v1.0/statewise')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            myQuery: result.myQuery,
            labels: result.myQuery.map(Query => Query.name),
            affected: result.myQuery.map(Query => Query.cnf_ind_count),
            cured: result.myQuery.map(Query => Query.death_count),
            deaths: result.myQuery.map(Query => Query.cured_count)
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  render() {
    const { error, isLoaded } = this.state;
    const { affected, cured, deaths, labels } = this.state;
    const numRows = labels.length;
    var i = 0,
      totalaffected = 0,
      totalcured = 0,
      totaldeaths = 0;
    while (i < numRows) {
      totalaffected = totalaffected + affected[i];
      totalcured = totalcured + cured[i];
      totaldeaths = totaldeaths + deaths[i];
      i++;
    }
    const data1 = {
      labels: labels,
      datasets: [
        {
          data: affected,
          backgroundColor: randomColor({
            count: 29
          }),
          hoverBackgroundColor: randomColor({
            count: 29
          })
        }
      ]
    };
    const data2 = {
      labels: ['total_affected', 'total_cured', 'total_deaths'],
      datasets: [
        {
          data: [totalaffected, totalcured, totaldeaths],
          backgroundColor: randomColor({
            count: 3
          }),
          hoverBackgroundColor: randomColor({
            count: 3
          })
        }
      ]
    };
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div>
            <h2>Affected Count Of All the States</h2>
            <Pie data={data1} />
          </div>
          <div>
            <h2>Overall Total Statistics</h2>
            <Pie data={data2} />
          </div>
        </div>
      );
    }
  }
}
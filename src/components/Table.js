import React from 'react';

import DataTable from 'react-data-table-component';
const columns = [
  {
    name: 'name',
    minWidth: '250px',
    selector: 'name',
    sortable: true
  },
  {
    name: 'remark',
    minWidth: '500px',
    selector: 'remark',
    sortable: true
  },
  {
    name: 'cnf_for_count',
    minWidth: '10px',
    selector: 'cnf_for_count',
    sortable: true,
    right: true
  },
  {
    name: 'death_count',
    minWidth: '10px',
    selector: 'death_count',
    sortable: true,
    right: true
  },
  {
    name: 'cured_count',
    minWidth: '10px',
    selector: 'cured_count',
    sortable: true,
    right: true
  },
  {
    name: 'cnf_ind_count',
    minWidth: '10px',
    selector: 'cnf_ind_count',
    sortable: true,
    right: true
  }
];
class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      myQuery: []
    };
  }

  componentDidMount() {
    fetch('https://api.metamug.com/covid/v1.0/statewise')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            myQuery: result.myQuery
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
    const { error, isLoaded, myQuery } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <DataTable
          sm='599px'
          pagination={true}
          paginationPerPage='10'
          md='959px'
          lg='1280px'
          responsive
          title='COVID-19'
          columns={columns}
          data={myQuery}
        />
      );
    }
  }
}

export default Table;

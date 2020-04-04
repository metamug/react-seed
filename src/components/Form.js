import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: 'POST',
      item: false,
      xml: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  handleSubmit = event => {
    this.setState(this.state, () => console.log(this.state));
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlfor='method'>Method</label>
            <select
              className='form-control'
              id='method'
              name='method'
              onChange={this.handleChange}
            >
              <option>POST</option>
              <option>PUT</option>
              <option>GET</option>
              <option>DELETE</option>
            </select>
          </div>
          <div className='custom-control custom-checkbox'>
            <input
              type='checkbox'
              className='custom-control-input'
              id='item'
              name='item'
              onChange={this.handleChange}
            />
            <label className='custom-control-label' for='item'>
              Select Item??
            </label>
          </div>
          <div className='form-group'>
            <label htmlfor='xml'>textarea</label>
            <textarea
              className='form-control'
              id='xml'
              name='xml'
              rows='3'
              onChange={this.handleChange}
            ></textarea>
          </div>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Form;

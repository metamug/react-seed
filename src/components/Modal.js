import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import convert from 'xml-js';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactModal from 'react-modal';
import './editor.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
var json = {
  Script: { attr: { id: 'myscript', output: 'true', file: 'hello-world' } },
};
var options = { compact: true, ignoreComment: true, spaces: 4 };
const customStyles = {
  content: {
    position: 'absolute',
    top: '50px',
    left: '250px',
    right: '400px',
    bottom: '50px',
  },
};
ReactModal.setAppElement('#root');
export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: 'Book',
      method: 'POST',
      item: false,
      showModal: false,
      xml: convert.json2xml(json, options),
      id: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = (event) => {
    this.setState({ showModal: false }, () => {
      console.log(this.state);
    });
    event.preventDefault();
  };

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  render() {
    const { xml } = this.state;
    const codeMirrorOptions = {
      readOnly: true,
      theme: 'material',
      lineNumbers: true,
      autoScroll: true,
      scrollbarStyle: null,
      lineWrapping: true,
    };
    return (
      <div>
        <button
          className='btn btn-primary'
          data-toggle='modal'
          onClick={this.handleOpenModal}
        >
          {this.props.content}
        </button>
        <ReactModal
          shouldCloseOnOverlayClick={true}
          isOpen={this.state.showModal}
          style={customStyles}
          contentLabel='Form Modal'
        >
          <div className='modal-content'>
            <form onSubmit={this.handleCloseModal}>
              <div className='modal-header text-center'>
                <h5 className='modal-title white-text w-100 font-weight-bold py-2'>
                  {this.props.title}
                </h5>
                <button
                  type='button'
                  className='close'
                  onClick={() => {
                    this.setState({ showModal: false });
                  }}
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='container'>
                  <div className='row'>
                    <div className='col-4'>
                      <div className='form-group'>
                        <label htmlfor='id'>Input Id:</label>
                        <input
                          className='form-control'
                          type='text'
                          id='id'
                          name='id'
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className='col-2'>
                      <div className='form-group'>
                        <label htmlfor='resources'>Add Resources:</label>
                        <select
                          className='form-control'
                          id='resources'
                          name='resources'
                          onChange={this.handleChange}
                        >
                          <option>Book</option>
                          <option>Author</option>
                          <option>Publisher</option>
                        </select>
                      </div>
                    </div>
                    <div className='col-2'>
                      <div className='form-group'>
                        <label htmlfor='method'>Method:</label>
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
                    </div>
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
                    <div className='row'>
                      <div className='code-editor xml-code col-8'>
                        <div className='editor-header'>XML</div>
                        <CodeMirror
                          value={xml}
                          name='xml'
                          options={{
                            mode: 'xml',
                            ...codeMirrorOptions,
                          }}
                          onBeforeChange={(editor, data, xml) => {
                            this.setState({ xml });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-footer d-flex justify-content-right'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => {
                    this.setState({ showModal: false });
                  }}
                >
                  Close
                </button>
                <button
                  type='submit'
                  onClick={this.handleCloseModal}
                  className='btn btn-primary btn-round'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </ReactModal>
      </div>
    );
  }
}

const props = {};

ReactDOM.render(<Modal {...props} />, document.getElementById('root'));

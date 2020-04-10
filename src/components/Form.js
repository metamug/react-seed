import React, { Component } from 'react';
import Modal from './Modal';
import { Controlled as CodeMirror } from 'react-codemirror2';
import './editor.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: 'Book',
      method: 'POST',
      item: false,
      xml: '',
      id: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  renderForm = () => {
    const { xml } = this.state;
    const codeMirrorOptions = {
      theme: 'material',
      lineNumbers: true,
      autoScroll: true,
      scrollbarStyle: null,
      lineWrapping: true
    };
    return (
      <div>
        <form>
          <div className='container'>
            <div className='row'>
              <div className='col-4'>
                <div className='form-group'>
                  <label htmlfor='resources'>Add Resources</label>
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
            </div>
            <div className='row'>
              <div className='col-4'>
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
                      ...codeMirrorOptions
                    }}
                    onBeforeChange={(editor, data, xml) => {
                      this.setState({ xml });
                    }}
                  />
                </div>
              </div>
              <br />
              <div className='row'>
                <div className='col-6'>
                  <label htmlfor='id'>Input Id:</label>
                  <input
                    type='text'
                    id='id'
                    name='id'
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };
  render() {
    return (
      <div>
        <br />
        <Modal
          content='Add to Resources'
          child={this.renderForm()}
          dec={this.state}
        />
      </div>
    );
  }
}

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactModal from 'react-modal';
import './editor.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
const customStyles = {
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px'
  }
};
ReactModal.setAppElement('#root');
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: 'Book',
      method: 'POST',
      item: false,
      showModal: false,
      html: '',
      css: '',
      js: '',
      id: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = event => {
    this.setState({ showModal: false }, () => {
      console.log(this.state);
      console.log(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
          ${this.state.css}
        </style>
      </head>
      <body>
        <div>${this.state.html}</div>

        <script type="text/javascript">
          ${this.state.js}
        </script>
      </body>
      </html>
      `);
    });
    event.preventDefault();
  };

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  render() {
    const { html, css, js } = this.state;
    const codeMirrorOptions = {
      theme: 'material',
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true
    };
    return (
      <div>
        <br />
        <button className='btn btn-primary' onClick={this.handleOpenModal}>
          Add to Resources
        </button>
        <ReactModal
          isOpen={this.state.showModal}
          style={customStyles}
          contentLabel='Form Modal'
        >
          <form onSubmit={this.handleCloseModal}>
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
                  <div className='code-editor html-code col-4'>
                    <div className='editor-header'>HTML</div>
                    <CodeMirror
                      value={html}
                      name='html'
                      options={{
                        mode: 'htmlmixed',
                        ...codeMirrorOptions
                      }}
                      onBeforeChange={(editor, data, html) => {
                        this.setState({ html });
                      }}
                    />
                  </div>
                  <div className='code-editor html-code col-4'>
                    <div className='editor-header'>CSS</div>
                    <CodeMirror
                      value={css}
                      name='css'
                      options={{
                        mode: 'css',
                        ...codeMirrorOptions
                      }}
                      onBeforeChange={(editor, data, css) => {
                        this.setState({ css });
                      }}
                    />
                  </div>
                  <div className='code-editor html-code col-4'>
                    <div className='editor-header'>JavaScript</div>
                    <CodeMirror
                      value={js}
                      name='js'
                      options={{
                        mode: 'javascript',
                        ...codeMirrorOptions
                      }}
                      onBeforeChange={(editor, data, js) => {
                        this.setState({ js });
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

              <button
                type='submit'
                onClick={this.handleCloseModal}
                className='btn btn-primary'
              >
                Submit
              </button>
            </div>
          </form>
        </ReactModal>
      </div>
    );
  }
}

const props = {};

ReactDOM.render(<Form {...props} />, document.getElementById('root'));

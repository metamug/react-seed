import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import pushid from 'pushid';
import './editor.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: 'POST',
      item: false,
      id: '',
      html: '',
      css: '',
      js: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: pushid()
    });
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  handleSubmit = event => {
    this.setState(this.state, () => {
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
            <div>
              <div className='code-editor html-code'>
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
              <div className='code-editor html-code'>
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
              <div className='code-editor html-code'>
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

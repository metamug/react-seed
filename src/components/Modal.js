import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

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

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      child: this.props.child,
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false }, () => {
      console.log(this.props.dec);
    });
  };

  render() {
    return (
      <div>
        <button className='btn btn-primary' onClick={this.handleOpenModal}>
          {this.props.content}
        </button>
        <ReactModal
          isOpen={this.state.showModal}
          style={customStyles}
          contentLabel='Form Modal'
        >
          <div>{this.props.child}</div>
          <button
            type='submit'
            onClick={this.handleCloseModal}
            className='btn btn-primary'
          >
            Submit
          </button>
        </ReactModal>
      </div>
    );
  }
}

const props = {};

ReactDOM.render(<Modal {...props} />, document.getElementById('root'));

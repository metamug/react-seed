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
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Add Resources</button>
        <ReactModal
          isOpen={this.state.showModal}
          style={customStyles}
          contentLabel='Form Modal'
        >
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </div>
    );
  }
}

const props = {};

ReactDOM.render(<Modal {...props} />, document.getElementById('root'));

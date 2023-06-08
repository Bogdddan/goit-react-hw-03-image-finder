import React, { Component } from "react";
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div onClick={this.handleBackdropClick} className={css.overlay}>
        <div className={css.modal}>
          <button onClick={this.props.closeModal} className={css.closeButton}>X</button>
          <img src={this.props.modalImage} alt="modalImage" />
        </div>
      </div>
    );
  }
}
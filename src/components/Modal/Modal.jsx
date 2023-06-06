import React, { Component } from "react";

class Modal extends Component {
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.key === "Escape") {
      this.props.onClose();
    }
  };

  handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { imageUrl, alt } = this.props;

    return (
      <div className="overlay" onClick={this.handleOverlayClick}>
        <div className="modal">
          <img src={imageUrl} alt={alt} />
        </div>
      </div>
    );
  }
}

export default Modal;

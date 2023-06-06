import React , { Component } from "react";
import css from './ImageGalley.module.css'

export class ImageGalleryItem extends Component {
  render() {
    return (
      <li className={css.ImgGalleryli} onClick={this.props.showModal}>
        <img src={this.props.smallImg} alt={this.props.alt} />
      </li>
    );
  }
}
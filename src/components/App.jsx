import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import {Searchbar} from './SearchBar/SearchBar';
import { Modal } from "./Modal/Modal";
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './Button/Button.module.css'


export class App extends Component {
  state = {
    searchQuery: '',
    isShowModal: false,
    modalImage: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  showModal = largeImageURL => {
    this.setState({ isShowModal: true, modalImage: largeImageURL });
  };

  closeModal = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    return (
      <>
        <div class="container">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          showModal={this.showModal}
          searchQuery={this.state.searchQuery}
        />
        {this.state.isShowModal && (
          <Modal
            closeModal={this.closeModal}
            modalImage={this.state.modalImage}
          />
        )}
        <ToastContainer className={css.toaster} autoClose={1000} theme="colored" />
        </div>
      </>
    );
  }
}

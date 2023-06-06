import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import {Searchbar} from './SearchBar/SearchBar';
import { Api } from "./Api/Api";
// import { ImageGallery } from './ImageGallery/ImageGallery'

export class App extends Component {

  state = {
    galleryName: '',
  };

  handleSubmitForm = galleryName => {
    this.setState({galleryName});
  }

  render() {
    return (
      <>
        <Searchbar 
        onSubmit={this.handleSubmitForm}
        />
        <Api galleryName={this.state.galleryName}/>
        <ToastContainer autoClose={3000}/>
      </>
    );
  }
}

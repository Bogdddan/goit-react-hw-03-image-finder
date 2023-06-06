import React, { Component } from "react";
import { Audio } from "react-loader-spinner";
import Button from 'components/Button/Button';
import Loader from "components/Loader/Loader";

export class Api extends Component {
  state = {
    gallery: null,
    loading: false,
    error: null,
    status: "idle",
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const currentName = this.props.galleryName;
    const { page } = this.state;
    if (prevProps.galleryName !== this.props.galleryName || prevState.page !== page) {
      this.setState({ status: "pending" });
      fetch(
        `https://pixabay.com/api/?q=${currentName}&page=${page}&key=35609158-f7b774b68c2563e05c4bac486&image_type=photo&orientation=horizontal`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(`за результатом ${currentName} нічого не знайдено`));
        })
        .then((gallery) => {
          console.log(gallery);
          this.setState((prevState) => ({
            gallery: prevState.gallery ? [...prevState.gallery, ...gallery.hits] : gallery.hits,
            status: "resolved",
          }));
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { status, gallery, error } = this.state;

    if (status === "idle") {
      return <div>Введіть дані</div>;
    }

    if (status === "pending") {
      return (
        <div>
            <Loader/>
        </div>
      );
    }

    if (status === "resolved" && gallery && gallery.length > 0) {
      return (
        <div>
          {gallery.map((photo) => (
            <img key={photo.id} src={photo.largeImageURL} alt={photo.tags} width="250" />
          ))}
          <Button onClick={this.loadMore} />
        </div>
      );
    }

    if (status === "resolved") {
      return <p>За результатом {this.props.galleryName} нічого не знайдено</p>;
    }

    if (status === "rejected") {
      return <p>{error.message}</p>;
    }
  }
}

// 
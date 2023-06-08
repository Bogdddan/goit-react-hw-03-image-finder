import React, { Component } from "react";
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { fetchGalleryImg } from '../Api/Api';
import css from './imageGallery.module.css';

export class ImageGallery extends Component {
    state = {
    images: null,
    loading: false,
    page: 1,
    hiddenBnt: false,
    };

    showErrorMsg = () => {
        toast.error (`за вашим результатом нічого не знайдено`);
};

componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
    this.setState({ loading: true, images: null, page: 1, hiddenBnt: false });

    
        fetchGalleryImg(this.props.searchQuery, this.state.page)
        .then(({ hits }) => {
            if (hits.length === 0) {
            this.showErrorMsg();
            } else this.setState({ images: hits });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    
}
}

    onFindMore = () => {
    this.setState(prevState => ({
        page: prevState.page + 1,
        loading: true,
        hiddenBnt: false,
    }));

        
        fetchGalleryImg(this.props.searchQuery, this.state.page)
            .then(({ hits, totalHits }) => {
            if (hits.length === 0) {
                this.showErrorMsg();
                this.setState({ hiddenBnt: true });
            } else
                this.setState(prevState => ({
                images: [...prevState.images, ...hits],
                }));
            if (12 * this.state.page > totalHits) {
                this.setState({ hiddenBnt: true });
                this.showErrorMsg();
            }
            })
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ loading: false }));

    };

    render() {
    return (
        <>
        {this.state.loading && <Loader />}

        {this.state.images && (
            <ul className={css.imageGalleryUl}>
            {this.state.images.map(image => {
                return (
                <ImageGalleryItem
                    showModal={() => this.props.showModal(image.largeImageURL)}
                    key={image.id}
                    smallImg={image.webformatURL}
                    alt={image.tags}
                />
                );
            })}
            </ul>
        )}
        {this.state.images && !this.state.hiddenBnt && (
            <Button onFindMore={() => this.onFindMore()} />
        )}
        </>
    );
    }
}
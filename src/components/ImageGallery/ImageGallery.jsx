import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { fetchGalleryImg } from '../Api/Api';
import css from './imageGallery.module.css';

export class ImageGallery extends Component {
state = {
    images: null,
    loading: false,
    page: 1,
    hiddenBtn: false,
    searchQuery: '',
};

showErrorMsg = () => {
    toast.error(`За вашим результатом нічого не знайдено`);
};

componentDidUpdate(prevProps, prevState) {
    if (
        prevProps.searchQuery !== this.props.searchQuery ||
        prevState.page !== this.state.page
    ) {
        this.setState(
        {
            loading: true,
            images: null,
            page: 1,
            hiddenBtn: false,
            searchQuery: this.props.searchQuery,
        },
        () => {
            this.fetchImages();
        }
    );
    }
}

fetchImages = () => {
    const { searchQuery, page } = this.state;
    this.setState({ loading: true });

    fetchGalleryImg(searchQuery, page)
        .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
            this.showErrorMsg();
            this.setState({ hiddenBtn: true });
        } else {
            this.setState((prevState) => ({
            images: prevState.images
                ? [...prevState.images, ...hits]
                : hits,
            }));
        }
        if (12 * page > totalHits) {
            this.setState({ hiddenBtn: true });
        }
    })
    .catch((error) => {
        console.error('Error fetching images:', error);
    })
    .finally(() => {
        this.setState({ loading: false });
    });
};

loadMoreImages = () => {
    this.setState(
        (prevState) => ({
        page: prevState.page + 1,
        }),
        () => {
        this.fetchImages();
    }
    );
};

render() {
    const { loading, images, hiddenBtn } = this.state;

    const isButtonDisabled = !images || hiddenBtn;

    return (
    <>
        {loading && <Loader />}

        {images && (
            <ul className={css.imageGalleryUl}>
            {images.map((image) => (
                <ImageGalleryItem
                showModal={() => this.props.showModal(image.largeImageURL)}
                key={image.id}
                smallImg={image.webformatURL}
                alt={image.tags}
            />
            ))}
        </ul>
        )}

        {images && !hiddenBtn && (
        <Button onFindMore={this.loadMoreImages} disabled={isButtonDisabled} />
        )}
    </>
    );
}
}
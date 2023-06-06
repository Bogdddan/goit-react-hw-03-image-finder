import React, { Component } from "react";

export class Searchbar extends Component {

    state={
        galleryName: '',
    }

    handleNameChange = e => {
        this.setState({ galleryName: e.currentTarget.value.toLowerCase() });
    }

    handleFormSubmit = e => {
        e.preventDefault();



        this.props.onSubmit(this.state.galleryName);
        this.setState({galleryName: ''});
    }

    render() {
        return(
            <>
            <header>
                <form onSubmit={this.handleFormSubmit}>
                    <button type="submit" class="button">
                        <span>Search</span>
                    </button>
                    <input
                        type="text"
                        onChange={this.handleNameChange}
                        value={this.state.galleryName}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
            </>
        );
    }
}

import React, { Component } from "react";
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
    state = {
      searchQuery: '',
    };
  
    handleQueryChange = event => {
      this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
    };
  
    handleSubmit = event => {
      event.preventDefault();
      if (this.state.searchQuery.trim() === '') {
        toast.error('Enter a keyword');
        return;
      }
      this.props.onSubmit(this.state.searchQuery);
      this.setState({ searchQuery: '' });
    };
  
    render() {
      return (
        <div onSubmit={this.handleSubmit} className="searchbar">
          <form className={css.form}>
            <input
              onChange={this.handleQueryChange}
              value={this.state.searchQuery}
              className={css.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
            <button type="submit" className={css.button}>
              <span className="button-label">Search</span>
            </button>
          </form>
        </div>
      );
    }
  }
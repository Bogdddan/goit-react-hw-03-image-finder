import React, { Component } from 'react';
import css from './Button.module.css';


export class Button extends Component {
  render() {
    return (
      <button
      className={css.buttonLoadMore}
        onClick={this.props.onFindMore}
        type="button"
      >
        Load more
      </button>
    );
  }
}
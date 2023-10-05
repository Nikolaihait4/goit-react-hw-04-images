import React, { Component } from 'react';
import css from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { selectedImage } = this.props;

    if (!selectedImage) return null;

    const { tags, largeImageURL } = selectedImage;

    return (
      <div className={css.overlay} onClick={this.handleOverlayClick}>
        <div className={css.modal}>
          <button className={css.closeBtn} onClick={this.props.onCloseModal}>
            &times;
          </button>
          <img
            src={largeImageURL}
            alt={tags}
            loading="lazy"
            className={css.largeImg}
          />
        </div>
      </div>
    );
  }
}

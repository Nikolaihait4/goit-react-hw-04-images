import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  handleImageClick = () => {
    const { item, onOpenModal } = this.props;
    onOpenModal(item); // Вызовите метод для открытия модального окна с выбранным изображением
  };

  render() {
    const { tags, webformatURL } = this.props.item;
    return (
      <li onClick={this.handleImageClick} className={css.imgGItemlist}>
        <img src={webformatURL} alt={tags} className={css.imgPixabay} />
      </li>
    );
  }
}

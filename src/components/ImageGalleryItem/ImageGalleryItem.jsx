import React from 'react';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ item, onOpenModal }) {
  const handleImageClick = () => {
    onOpenModal(item);
  };

  const { tags, webformatURL } = item;
  return (
    <li onClick={handleImageClick} className={css.imgGItemlist}>
      <img src={webformatURL} alt={tags} className={css.imgPixabay} />
    </li>
  );
}

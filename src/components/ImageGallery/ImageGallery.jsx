import React from 'react';
import css from './ImageGallery.module.css';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ items, onOpenModal }) => {
  return (
    <div className={css.imgGallerySec}>
      <ul className={css.imgGalleryKomponent}>
        {items.map((item, index) => (
          <ImageGalleryItem
            key={item.id || index} // Используем индекс, если id не уникален
            item={item}
            onOpenModal={onOpenModal}
          />
        ))}
      </ul>
    </div>
  );
};

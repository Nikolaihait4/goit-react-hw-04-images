import React, { useEffect } from 'react';
import css from './Modal.module.css';

export function Modal({ selectedImage, onCloseModal }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  if (!selectedImage) return null;

  const { tags, largeImageURL } = selectedImage;

  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onCloseModal}>
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

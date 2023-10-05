import React, { useState, useEffect } from 'react';

import { findImg } from 'services/api';
import css from './App.module.css';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import Notiflix from 'notiflix';
import { Modal } from 'components/Modal/Modal';
import { LoadMoreBtn } from 'components/Button/Button';

export function App() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    data: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (query.trim() === '') {
      return;
    }

    setIsLoading(true);

    async function fetchImg() {
      try {
        const img = await findImg(query, page);

        if (img.hits.length === 0) {
          Notiflix.Notify.info('Изображение не найдено.');
        } else {
          setItems(prevItems => [...prevItems, ...img.hits]);
          setTotal(img.total);
          Notiflix.Notify.success('Изображение успешно найдено.');
        }
      } catch (error) {
        Notiflix.Notify.failure('Произошла ошибка при поиске изображения.');
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImg();
  }, [query, page]);

  const handleSearch = newQuery => {
    if (newQuery.trim() === '') {
      Notiflix.Notify.warning('Введите поисковый запрос.');
      return;
    }

    setQuery(newQuery);
    setPage(1);
    setItems([]);
    setError(null);
  };

  const checkLastItems = () => {
    return items.length === total;
  };

  const onOpenModal = modalData => {
    setModal({
      isOpen: true,
      data: modalData,
    });
    setSelectedImage(modalData);
  };

  const onCloseModal = () => {
    setModal({
      isOpen: false,
      data: null,
    });
    setSelectedImage(null);
  };

  const isSearchSuccessful = items.length > 0;
  const isLastItems = checkLastItems();

  return (
    <div className={css.appcomponent}>
      <Searchbar handleSearch={handleSearch} />
      {isLoading && <Loader />}
      {isSearchSuccessful && (
        <div className={css.imgandbutton}>
          <ImageGallery items={items} onOpenModal={onOpenModal} />
          {!isLastItems && <LoadMoreBtn onLoadMore={() => setPage(page + 1)} />}
        </div>
      )}
      {error && <p>{error}</p>}
      <Modal selectedImage={selectedImage} onCloseModal={onCloseModal} />
    </div>
  );
}

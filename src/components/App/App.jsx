import React, { Component } from 'react';
import { findImg } from 'services/api';
import css from './App.module.css';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import Notiflix from 'notiflix';
import { LoadMoreBtn } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    items: [],
    page: 1,
    total: 0,
    error: null,
    isLoading: false,
    modal: {
      isOpen: false,
      data: null,
    },
    selectedImage: null,
  };

  // Функция для поиска изображения
  fetchImg = async () => {
    try {
      this.setState({ isLoading: true });
      const img = await findImg(this.state.query, this.state.page);

      if (img.hits.length === 0) {
        Notiflix.Notify.info('Изображение не найдено.');
      } else {
        this.setState({ items: img.hits, total: img.total });
        Notiflix.Notify.success('Изображение успешно найдено.');
      }
    } catch (error) {
      Notiflix.Notify.failure('Произошла ошибка при поиске изображения.');
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  // Функция для загрузки дополнительных изображений
  loadMoreImages = async () => {
    const { query, page, items, total } = this.state;
    const nextPage = page + 1;

    if (items.length >= total) {
      Notiflix.Notify.info('Больше изображений не найдено.');
      return;
    }

    try {
      const img = await findImg(query, nextPage);

      if (img.hits.length === 0) {
        Notiflix.Notify.info('Больше изображений не найдено.');
      } else {
        this.setState(prevState => ({
          items: [...prevState.items, ...img.hits],
          page: nextPage,
        }));
        Notiflix.Notify.success('Изображения успешно загружены.');
      }
    } catch (error) {
      Notiflix.Notify.failure('Произошла ошибка при загрузке изображений.');
      this.setState({ error: error.message });
    }
  };

  handleSearch = (query, e) => {
    if (query.trim() === '') {
      Notiflix.Notify.warning('Введите поисковый запрос.');
      return;
    }

    this.setState({ query, page: 1, items: [], error: null }, () => {
      this.fetchImg();
    });
  };

  // Обновленный метод как стрелочная функция
  checkLastItems = () => {
    const { items, total } = this.state;
    return items.length === total;
  };

  onOpenModal = modalData => {
    this.setState({
      modal: {
        isOpen: true,
        data: modalData,
      },
      selectedImage: modalData,
    });
  };

  onCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        data: null,
      },
      selectedImage: null,
    });
  };

  render() {
    const { items, isLoading, error, selectedImage } = this.state; // Добавили selectedImage в деструктуризацию
    const isSearchSuccessful = items.length > 0;
    const isLastItems = this.checkLastItems();

    return (
      <div className={css.appcomponent}>
        <Searchbar handleSearch={this.handleSearch} />
        {isLoading && <Loader />}
        {isSearchSuccessful && (
          <div className={css.imgandbutton}>
            <ImageGallery items={items} onOpenModal={this.onOpenModal} />{' '}
            <LoadMoreBtn
              onLoadMore={this.loadMoreImages}
              isLastItems={isLastItems}
            />
          </div>
        )}
        {error && <p>{error}</p>}
        <Modal selectedImage={selectedImage} onCloseModal={this.onCloseModal} />
      </div>
    );
  }
}

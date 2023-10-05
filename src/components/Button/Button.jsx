import React, { useState, useEffect } from 'react';
import css from './Button.module.css';

export const LoadMoreBtn = ({ onLoadMore }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      onLoadMore();
      setIsLoading(false);
    }
  }, [isLoading, onLoadMore]);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <div className={css.loadmoreBtnWrapper}>
      <button
        type="button"
        onClick={handleClick}
        className={css.loadmoreBtn}
        disabled={isLoading}
      >
        {isLoading ? 'Загрузка...' : 'Загрузить еще'}
      </button>
    </div>
  );
};

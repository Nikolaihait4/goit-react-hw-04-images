import css from './Button.module.css';

export const LoadMoreBtn = ({ onLoadMore, isLastItems }) => {
  return (
    <button
      type="button"
      onClick={onLoadMore}
      disabled={isLastItems}
      className={css.loadmoreBtn}
    >
      Load more
    </button>
  );
};

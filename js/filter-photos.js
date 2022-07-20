import { shuffleArray, debounce } from './util.js';
import { renderPictureList } from './thumbnails.js';

const QUANTITY_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;
const FILTERS ={
  DEFAULT : 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filtersContainer = document.querySelector('.img-filters');

const filterByRandom = (data) => shuffleArray(data).slice(0, QUANTITY_RANDOM_PHOTOS);

const filterByComments = (data) => {
  const photosCopied = data.slice(0, data.length-1);
  return photosCopied.sort((a,b) => b.comments.length - a.comments.length);
};

const setupFilters = (data) => {
  filtersContainer.classList.remove('img-filters--inactive');
  const setFilter = debounce((filter) => {
    switch(filter) {
      case FILTERS.DEFAULT:
        renderPictureList(data);
        break;
      case FILTERS.RANDOM:
        renderPictureList(filterByRandom(data));
        break;
      case FILTERS.DISCUSSED:
        renderPictureList(filterByComments(data));
        break;
    }
  }, RERENDER_DELAY);


  const onFilterChange = (evt) => {
    const activeButton = filtersContainer.querySelector('.img-filters__button--active');
    const target = evt.target;
    if(target.className === 'img-filters__button') {
      evt.preventDefault();
      activeButton.classList.remove('img-filters__button--active');
      target.classList.add('img-filters__button--active');
    }
    setFilter(target.id);
  };

  filtersContainer.addEventListener('click', onFilterChange);
};

export { setupFilters};

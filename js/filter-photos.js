import { shuffleArray } from './util.js';
import { clearPictureList } from './thumbnails.js';

const QUANTITY_RANDOM_PHOTOS = 10;
const filtersContainer = document.querySelector('.img-filters');

const defaultFilter = (data) => data;

const randomFilter = (data) => shuffleArray(data).slice(0, QUANTITY_RANDOM_PHOTOS);

const commentsFilter = (data) => {
  const photosCopied = data.slice(0, data.length-1);
  return photosCopied.sort((a,b) => b.comments.length - a.comments.length);
};

const setFilter = (filter, data) => {
  switch(filter) {
    case 'filter-default':
      defaultFilter(data);
      break;
    case 'filter-random':
      randomFilter(data);
      break;
    case 'filter-discussed':
      commentsFilter(data);
      break;
    default:
      defaultFilter(data);
  }
};

const onFilterChange = (evt) => {
  const activeButton = filtersContainer.querySelector('.img-filters__button--active');
  const target = evt.target;
  if(target.className === 'img-filters__button') {
    evt.preventDefault();
    activeButton.classList.remove('img-filters__button--active');
    target.classList.add('img-filters__button--active');
  }
  clearPictureList();
  setFilter(target.id);
};

const setupFilters = (cb) => {
  filtersContainer.addEventListener('click', onFilterChange);
  cb();
};


export { setupFilters,onFilterChange,commentsFilter, defaultFilter, randomFilter}

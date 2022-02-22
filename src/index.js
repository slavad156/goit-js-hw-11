import './css/styles.css';
import cardImg from './templates/cards.hbs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getImg from './js/fetchImg';

const serchFormRef = document.querySelector('.search-form');
const gallegyRef = document.querySelector('.gallery');
const loadMoreRef = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  navText: ['⇦', '⇨'],
});

serchFormRef.addEventListener('submit', onSearch);
loadMoreRef.addEventListener('click', onLoadMore)

let serchQuery = '';
let page = 1;
let perPage = 5;

function onSearch(e) {
  e.preventDefault();
  page = 1;
  
  serchQuery = e.currentTarget.searchQuery.value.trim();
  
  if (serchQuery !== '') {
    getImg(serchQuery, page, perPage).then(({ data }) => {
      if (data.totalHits === 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
      }
      gallegyRef.innerHTML = '';
      renderImageCards(data.hits);
      lightbox.refresh();
      page += 1;
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      loadMoreRef.classList.remove('is-hidden');
    });
  }
  
}

function renderImageCards(data) {
  gallegyRef.insertAdjacentHTML('beforeend', cardImg(data));
}

function onLoadMore() {
  getImg(serchQuery, page, perPage).then(({data}) => {
    renderImageCards(data.hits);
    lightbox.refresh();
    page += 1;
  });
}

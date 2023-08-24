import axios from "axios";
import Notiflix from "notiflix";
import '/src/common.css'


const refs = {
    searchForm: document.querySelector('.search-form'),
    input: document.querySelector('[name="searchQuery"]'),
    gallery: document.querySelector('.gallery'),
    load: document.querySelector('.load-more'),
}

refs.load.classList.add('is-hidden');


const pageNum = 40;
let currentPage = 1;
let query = '';
let totalElem;


refs.searchForm.addEventListener('submit', onSearchFormOnSubmit)

function onSearchFormOnSubmit(evt) {
    evt.preventDefault();
    query = refs.input.value;
    currentPage = 1;
    refs.gallery.innerHTML = '';
    fetchImage();
    refs.input.value = '';
    refs.load.classList.remove('is-hidden')
}

const BASE_URL = 'https://pixabay.com/api/'
const api_key = '39038842-507cdb0c8ef13fbd02c51e5f3'

async function fetchImage() {
    const PARAMS = new URLSearchParams({
        key: api_key,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: pageNum,
        page: currentPage,
    });

    try {
        const res = await axios.get(`${BASE_URL}?${PARAMS}`);
        const photos = res.data.hits;
        totalElem = res.data.total;
        if (totalElem === 0) {
            Notiflix.Report.info("info", "Sorry, there are no images matching your search query. Please try again.")
        } else {
            renderImagesList(photos);
        }
        return photos;
    } catch {
        error => {
            Notiflix.Report.failure(
                'ERROR',
                'Oops! Something went wrong! Try reloading the page!',
                'Okay',);
        }
    }
}

function renderImagesList(arr) {
    const markupImages = arr.map(image => `<div class="photo-card">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${image.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${image.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
       <span>${image.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${image.downloads}</span>
    </p>
  </div>
</div>`).join('')
    refs.gallery.insertAdjacentHTML('beforeend', markupImages);
}

refs.load.addEventListener('click', onLoadClick)


function onLoadClick() {
    currentPage += 1;
    fetchImage().then(data => {
        renderImagesList(data);
    })
}


// test test
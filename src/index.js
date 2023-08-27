
import Notiflix from 'notiflix';
import '/src/common.css'
import { renderImagesList } from "./js/render";
import { refs } from "./js/refs";
import { fetchImage } from "./js/fetch";
import { fetchParam } from './js/fetch';

refs.load.classList.add('is-hidden');

refs.searchForm.addEventListener('submit', onSearchFormSubmit)

function onSearchFormSubmit(evt) {
    evt.preventDefault();
    if (!refs.input.value.trim()) {
        Notiflix.Report.warning(
            'Warning',
            'The input field must be filled!',
            'Okay'
        );
        return;
    }


    fetchParam.query = refs.input.value;
    fetchParam.currentPage = 1;
    refs.gallery.innerHTML = '';
    fetchImage();
    refs.input.value = '';
    refs.load.classList.remove('is-hidden')
}




refs.load.addEventListener('click', onLoadClick)


function onLoadClick() {
    fetchParam.currentPage += 1;
    fetchImage().then(data => {
        renderImagesList(data);
    })
}
import axios from "axios";
import Notiflix from "notiflix";
import { refs } from "./refs";
import { renderImagesList } from "./render";


export const fetchParam = {
    query: '',
    currentPage: 1,
    pageNum: 40,
    totalElem: 0,
    maxPage: 1,
};



const BASE_URL = 'https://pixabay.com/api/'
const api_key = '39038842-507cdb0c8ef13fbd02c51e5f3'

export async function fetchImage() {
    const PARAMS = new URLSearchParams({
        key: api_key,
        q: fetchParam.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: fetchParam.pageNum,
        page: fetchParam.currentPage,
    });


    try {
        const res = await axios.get(`${BASE_URL}?${PARAMS}`);
        const photos = res.data.hits;
        fetchParam.totalElem = res.data.total;
        fetchParam.maxPage = Math.ceil(res.data.total / fetchParam.pageNum)
        if (fetchParam.totalElem === 0) {
            refs.load.classList.add('is-hidden');
            Notiflix.Report.info("Information", "Sorry, there are no images matching your search query. Please try again.")

        } else {
            renderImagesList(photos);
            updateStatusBtn()
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

function updateStatusBtn() {
    if (fetchParam.currentPage === fetchParam.maxPage) {
        refs.load.classList.add('is-hidden');
    }
}
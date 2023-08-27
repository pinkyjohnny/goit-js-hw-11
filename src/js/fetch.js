import axios from "axios";
import Notiflix from "notiflix";
import { refs } from "./refs";
import { renderImagesList } from "./render";


export const fetchParam = {
    query: '',
    currentPage: 1,
    pageNum: 40,
    totalElem: 0
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
        if (fetchParam.totalElem === 0) {
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
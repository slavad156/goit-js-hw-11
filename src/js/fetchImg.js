import axios from "axios";
const KEY_API = '25819136-b0d04262637a5823868c8b07c';


const BASE_URL = 'https://pixabay.com/api/';
export default async function getImg(word, page, perPage) {
    
    const response = await axios.get(`${BASE_URL}/?key=${KEY_API}&q=${word}&image_type='photo'&page=${page}&per_page=${perPage}&orientation='horizontal'&safesearch='true'`);
    
    return response;
}



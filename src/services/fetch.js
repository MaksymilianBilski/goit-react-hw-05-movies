import axios from 'axios';
const KEY = 'e49decb7b714a95bd454096b6ce610cd';

const fetch = async (queryType, query, page) => {
  axios.defaults.baseURL = 'https://api.themoviedb.org/3';
  const response = await axios.get(
    `/${queryType}/${query}?api_key=${KEY}&page=${page}`
  );
  return response;
};

export default fetch;

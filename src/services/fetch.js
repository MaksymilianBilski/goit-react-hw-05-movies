import axios from 'axios';
const KEY = 'e49decb7b714a95bd454096b6ce610cd';

const fetchTrending = async (queryType, query, page) => {
  axios.defaults.baseURL = 'https://api.themoviedb.org/3';
  const response = await axios.get(
    `/${queryType}/${query}?api_key=${KEY}&page=${page}`
  );
  return response;
};

const fetchDetails = async (queryType, movieId) => {
  axios.defaults.baseURL = 'https://api.themoviedb.org/3';
  const response = await axios.get(`/${queryType}/${movieId}?api_key=${KEY}`);
  console.log(response);
  return response;
};

export { fetchDetails, fetchTrending };

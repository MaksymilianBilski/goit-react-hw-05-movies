import axios from 'axios';
const KEY = 'e49decb7b714a95bd454096b6ce610cd';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const fetchTrending = async (queryType, query, page) => {
  const response = await axios.get(
    `/${queryType}/${query}?api_key=${KEY}&page=${page}`
  );
  console.log(response.data.results);
  return response.data.results;
};

const fetchDetails = async (queryType, movieId) => {
  const response = await axios.get(`/${queryType}/${movieId}?api_key=${KEY}`);
  console.log(response);
  return response.data;
};

const fetchCredits = async (queryType, movieId) => {
  const response = await axios.get(
    `/${queryType}/${movieId}/credits?api_key=${KEY}`
  );
  return response.data;
};

const fetchReviews = async (queryType, movieId) => {
  const response = await axios.get(
    `/${queryType}/${movieId}/reviews?api_key=${KEY}`
  );
  console.log(response);
  return response.data;
};

const fetchByQuery = async (query, page) => {
  const response = await axios.get(
    `/search/movie/?api_key=${KEY}&query=${query}&page=${page}`
  );
  console.log(response.data.results);
  return response.data.results;
};

export {
  fetchDetails,
  fetchTrending,
  fetchCredits,
  fetchReviews,
  fetchByQuery,
};

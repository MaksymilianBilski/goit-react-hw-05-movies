import { useState, useContext, useEffect, createContext } from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Notiflix from 'notiflix';
import {
  fetchTrending,
  fetchDetails,
  fetchCredits,
  fetchReviews,
  fetchByQuery,
} from 'services/fetch';

export const MoviesContext = createContext();
export const useMoviesContext = () => useContext(MoviesContext);

const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState();
  const [movieCredits, setMovieCredits] = useState();
  const [movieReviews, setMovieReviews] = useState();
  const [queryData, setQueryData] = useState();
  const [inputValue, setInputValue] = useState();

  const onSubmit = evt => {
    evt.preventDefault();
    const input = evt.target.search.value;
    setInputValue(input);
    fetchQueryData(input, 1);
  };

  const fetchTrendingData = async () => {
    try {
      const movies = await fetchTrending('trending', 'all/day', '1');
      setMovies(movies);
    } catch (error) {
      return;
    }
  };

  const fetchDetailsData = async movieId => {
    try {
      const movieDetails = await fetchDetails('movie', movieId);
      setMovieDetails(movieDetails);
    } catch (error) {
      setMovieDetails(movies.find(el => el.id === movieId));
      return;
    }
  };

  const fetchCreditsData = async movieId => {
    try {
      const movieCredits = await fetchCredits('movie', movieId);
      setMovieCredits(movieCredits);
    } catch (error) {
      return;
    }
  };

  const fetchReviewsData = async movieId => {
    try {
      const movieReviews = await fetchReviews('movie', movieId);
      setMovieReviews(movieReviews.results);
      console.log(movieReviews);
    } catch (error) {}
  };

  const fetchQueryData = async (query, page) => {
    try {
      const queryData = await fetchByQuery(query, page);
      setQueryData(queryData);
    } catch (error) {}
  };

  useEffect(() => {
    fetchTrendingData();
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        useMoviesContext,
        fetchDetailsData,
        fetchCreditsData,
        fetchReviewsData,
        fetchQueryData,
        onSubmit,
        movies,
        movieDetails,
        movieCredits,
        movieReviews,
        queryData,
        inputValue,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;

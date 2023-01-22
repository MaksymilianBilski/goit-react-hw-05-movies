import { useState, useContext, useEffect, createContext } from 'react';
// import PropTypes from 'prop-types';
// import Notiflix from 'notiflix';
import {
  fetchTrending,
  fetchDetails,
  fetchCredits,
  fetchReviews,
} from 'services/fetch';

export const MoviesContext = createContext();
export const useMoviesContext = () => useContext(MoviesContext);

const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState();
  const [movieCredits, setMovieCredits] = useState();
  const [movieReviews, setMovieReviews] = useState();

  const fetchTrendingData = async () => {
    try {
      const movies = await fetchTrending('trending', 'all/day', '1');
      setMovies(movies);
      console.log(movies);
    } catch (error) {
      return;
    }
  };

  const fetchDetailsData = async movieId => {
    try {
      const movieDetails = await fetchDetails('movie', movieId);
      setMovieDetails(movieDetails);
    } catch (error) {
      console.log(error);
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
      setMovieReviews(movieReviews);
    } catch (error) {
      console.log(error);
    }
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
        movies,
        movieDetails,
        movieCredits,
        movieReviews,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;

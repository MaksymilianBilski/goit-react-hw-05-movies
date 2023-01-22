import { useState, useContext, useEffect, createContext } from 'react';
// import PropTypes from 'prop-types';
// import Notiflix from 'notiflix';
import { fetchTrending, fetchDetails } from 'services/fetch';

export const MoviesContext = createContext();
export const useMoviesContext = () => useContext(MoviesContext);

const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState();

  const trendingData = async () => {
    try {
      const movies = await fetchTrending('trending', 'all/day', '1');
      setMovies([...movies.data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  const detailsData = async movieId => {
    try {
      const movieDetails = await fetchDetails('movie', movieId);
      setMovieDetails(movieDetails);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    trendingData();
  }, []);
  return (
    <MoviesContext.Provider
      value={{ useMoviesContext, detailsData, movieDetails, movies }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;

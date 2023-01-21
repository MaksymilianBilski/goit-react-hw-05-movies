import { useState, useContext, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import fetch from 'services/fetch';

const MoviesContext = createContext();
export const useMoviesContext = () => useContext(MoviesContext);

const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState();

  const trending = async () => {
    const movies = await fetch('trending', 'all/day', '1');
    setMovies([...movies.data.results]);
  };

  const details = async movieId => {
    try {
      const movieDetails = await fetch('movie', movieId, '1');
      setMovieDetails(movieDetails);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    trending();
  }, []);
  return (
    <MoviesContext.Provider
      value={{ useMoviesContext, details, movieDetails, movies }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;

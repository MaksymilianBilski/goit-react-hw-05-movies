import { useState, useContext, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams, useLocation } from 'react-router-dom';
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
  const [previousLocation, setPreviousLocation] = useState();

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const onSubmit = evt => {
    evt.preventDefault();
    const input = evt.target.search.value;
    setSearchParams('query=' + input);
    setInputValue(input);
    fetchQueryData(input, 1);
    setPreviousLocation(location);
  };

  const fetchTrendingData = async () => {
    try {
      const movies = await fetchTrending('trending', 'all/day', '1');
      setMovies(movies);
      console.log(location);
      setPreviousLocation(location);
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
        searchParams,
        previousLocation,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

MoviesProvider.propTypes = {
  useMoviesContext: PropTypes.func,
  fetchDetailsData: PropTypes.func,
  fetchCreditsData: PropTypes.func,
  fetchReviewsData: PropTypes.func,
  fetchQueryData: PropTypes.func,
  onSubmit: PropTypes.func,
  movies: PropTypes.arrayOf(
    PropTypes.objectOf({
      id: PropTypes.number,
      original_title: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  movieDetails: PropTypes.arrayOf(
    PropTypes.objectOf({
      backdrop_path: PropTypes.string,
      poste_path: PropTypes.string,
      original_title: PropTypes.string,
      name: PropTypes.string,
      vote_average: PropTypes.number,
      genres: PropTypes.arrayOf(PropTypes.objectOf({ name: PropTypes.string })),
    })
  ),
  movieCredits: PropTypes.arrayOf(
    PropTypes.objectOf({
      profile_path: PropTypes.string,
      original_name: PropTypes.string,
      character: PropTypes.string,
    })
  ),
  movieReviews: PropTypes.arrayOf(
    PropTypes.objectOf({
      author: PropTypes.string,
      content: PropTypes.string,
    })
  ),
  queryData: PropTypes.arrayOf(
    PropTypes.objectOf({
      id: PropTypes.number,
      original_title: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  inputValue: PropTypes.string,
};

export default MoviesProvider;

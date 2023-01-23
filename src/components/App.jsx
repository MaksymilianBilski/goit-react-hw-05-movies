import { Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  fetchTrending,
  fetchDetails,
  fetchCredits,
  fetchReviews,
  fetchByQuery,
} from 'services/fetch';
import MovieDetails from 'pages/MovieDetails/MovieDetails';
import Button from './Button/Button';
import TrendingList from 'pages/Home/Home';
import MovieCast from 'pages/MovieCast/MovieCast';
import Reviews from 'pages/Reviews/Reviews';
import SearchMovies from 'pages/SearchMovies/Movies';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState();
  const [movieCredits, setMovieCredits] = useState();
  const [movieReviews, setMovieReviews] = useState();
  const [queryData, setQueryData] = useState();
  const [previousLocation, setPreviousLocation] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const onSubmit = evt => {
    evt.preventDefault();
    const input = evt.target.search.value;
    setSearchParams('query=' + input);
    fetchQueryData(input, 1);
    setPreviousLocation(location);
    console.log(searchParams);
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
      setPreviousLocation(location);
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
    <div>
      <div
        style={{
          color: 'blue',
          display: 'flex',
          justifyContent: 'center',
          gridGap: '5px',
          marginBottom: '10px',
          marginTop: '5px',
        }}
      >
        {location.pathname !== '/goit-react-hw-05-movies' &&
          location.pathname !== '/goit-react-hw-05-movies/' && (
            <Button path={previousLocation} name="go back" />
          )}
        <Button path="/goit-react-hw-05-movies" name="home" />
        <Button path="/movies" name="movies" />
      </div>
      <Routes>
        <Route
          path="/goit-react-hw-05-movies"
          element={
            <TrendingList movies={movies} fetchDetailsData={fetchDetailsData} />
          }
        ></Route>
        <Route
          path="/movies"
          element={
            <SearchMovies
              handleSubmit={onSubmit}
              queryData={queryData}
              fetchDetailsData={fetchDetailsData}
            />
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <MovieDetails
              movieDetails={movieDetails}
              fetchCreditsData={fetchCreditsData}
              fetchReviewsData={fetchReviewsData}
              previousLocation={previousLocation}
            />
          }
        >
          <Route
            path="cast"
            element={<MovieCast movieCredits={movieCredits} />}
          ></Route>
          <Route
            path="reviews"
            element={<Reviews movieReviews={movieReviews} />}
          ></Route>
        </Route>

        <Route
          path="*"
          element={
            <TrendingList movies={movies} fetchDetailsData={fetchDetailsData} />
          }
        ></Route>
      </Routes>
    </div>
  );
};

App.propTypes = {
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

export default App;

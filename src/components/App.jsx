import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchTrending, fetchDetails } from 'services/api';
import MovieDetails from 'pages/MovieDetails/MovieDetails';
import Button from './Button/Button';
import TrendingList from 'pages/Home/Home';
import MovieCast from 'pages/MovieCast/MovieCast';
import Reviews from 'pages/Reviews/Reviews';
import SearchMovies from 'pages/SearchMovies/Movies';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState();

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
          element={<SearchMovies fetchDetailsData={fetchDetailsData} />}
        />
        <Route
          path="/movies/:movieId"
          element={<MovieDetails movieDetails={movieDetails} />}
        >
          <Route path="cast" element={<MovieCast />}></Route>
          <Route path="reviews" element={<Reviews />}></Route>
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
  fetchDetailsData: PropTypes.func,
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
};

export default App;

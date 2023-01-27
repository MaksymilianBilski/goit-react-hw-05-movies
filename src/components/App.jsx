import { Routes, Route } from 'react-router-dom';
import MovieDetails from 'pages/MovieDetails/MovieDetails';
import Button from './Button/Button';
import TrendingList from 'pages/Home/Home';
import MovieCast from 'pages/MovieCast/MovieCast';
import Reviews from 'pages/Reviews/Reviews';
import SearchMovies from 'pages/SearchMovies/Movies';

const App = () => {
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
          element={<TrendingList />}
        ></Route>
        <Route path="/movies" element={<SearchMovies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<MovieCast />}></Route>
          <Route path="reviews" element={<Reviews />}></Route>
        </Route>

        <Route path="*" element={<TrendingList />}></Route>
      </Routes>
    </div>
  );
};

export default App;

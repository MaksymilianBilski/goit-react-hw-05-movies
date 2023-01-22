import { Routes, Route } from 'react-router-dom';
import MovieDetails from './MovieDetails/MovieDetails';
import Button from './Button/Button';
import TrendingList from './Home/Home';
import MovieCast from './MovieCast/MovieCast';
import Reviews from './Reviews/Reviews';
import NotFound from './NotFound/NotFound';
import SearchMovies from './SearchMovies/Movies';

export const App = () => {
  return (
    <div>
      <Button path="/goit-react-hw-05-movies" name="home" />
      <Button path="/movies" name="movies" />
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

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};

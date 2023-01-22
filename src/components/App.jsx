import { useMoviesContext } from 'context/MoviesContext';
import { Routes, Route } from 'react-router-dom';
import MovieDetails from './MovieDetails/MovieDetails';
import Button from './Button/Button';
import TrendingList from './Home/Home';
import NotFound from './NotFound/NotFound';

export const App = () => {
  const { movies } = useMoviesContext();
  return (
    <div>
      <Button path="movies" name="movies" />
      <Button path="/" name="home" />
      <Button path="/" name="go back" />
      <Routes>
        <Route
          path="/"
          element={
            movies !== undefined ? <TrendingList movies={movies} /> : <></>
          }
        ></Route>
        <Route path="/movies" />
        <Route path="/movies/:movieId" element={<MovieDetails />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
};

import { useMoviesContext } from 'context/MoviesContext';
import { Routes, Route } from 'react-router-dom';
import MovieDetails from './MovieDetails/MovieDetails';
import Button from './Button/Button';
import TrendingList from './Home/Home';

export const App = () => {
  const { movies } = useMoviesContext();
  return (
    <div>
      <Button name="movies" />
      <Button name="home" />
      <Routes>
        <Route
          path="/movies"
          element={
            movies !== undefined ? <TrendingList movies={movies} /> : <></>
          }
        />
        <Route path="/movies/:movieId" element={<MovieDetails />}></Route>
      </Routes>
    </div>
  );
};

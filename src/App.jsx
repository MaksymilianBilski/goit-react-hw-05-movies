import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Button from './components/Button/Button';
// import MovieDetails from 'pages/MovieDetails/MovieDetails';
// import TrendingList from 'pages/Home/Home';
// import MovieCast from 'pages/MovieCast/MovieCast';
// import Reviews from 'pages/Reviews/Reviews';
// import SearchMovies from 'pages/SearchMovies/Movies';

const MovieDetails = lazy(() => import('pages/MovieDetails/MovieDetails'));
const TrendingList = lazy(() => import('pages/Home/Home'));
const MovieCast = lazy(() => import('pages/MovieCast/MovieCast'));
const Reviews = lazy(() => import('pages/Reviews/Reviews'));
const SearchMovies = lazy(() => import('pages/SearchMovies/Movies'));

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
      <Suspense
        fallback={<div style={{ height: '200', fontSize: 50 }}>loading...</div>}
      >
        <Routes>
          <Route path="/goit-react-hw-05-movies" element={<TrendingList />} />
          <Route path="/movies" element={<SearchMovies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>

          <Route
            path="*"
            element={<Navigate to="/goit-react-hw-05-movies" />}
          ></Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;

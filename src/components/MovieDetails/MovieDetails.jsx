import { useMoviesContext } from 'context/MoviesContext';
import { NavLink, Outlet } from 'react-router-dom';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const photoUrl = 'https://image.tmdb.org/t/p/w500/';
  const { movieDetails, fetchCreditsData, fetchReviewsData } =
    useMoviesContext();
  return movieDetails !== undefined ? (
    <div>
      <img
        src={
          photoUrl +
          `${
            movieDetails.backdrop_path
              ? `${movieDetails.backdrop_path}`
              : `${movieDetails.poster_path}`
          }`
        }
        alt={movieDetails.tags}
      ></img>
      <div>
        <h1>
          {movieDetails.original_title
            ? `${movieDetails.original_title}`
            : `${movieDetails.name}`}
        </h1>
        <p>User Score: {movieDetails.vote_average}%</p>
        <h2>Overview</h2>
        <p>{movieDetails.overview}</p>
        <h3>Genres</h3>
        <p>
          {movieDetails.genres !== undefined ??
            movieDetails.genres.map(el => el.name).join(', ')}
        </p>
        <div className={css.navigation}>
          <NavLink
            className={css.navlink}
            onClick={() => {
              fetchCreditsData(movieDetails.id);
            }}
            to="cast"
          >
            cast
          </NavLink>
          <NavLink
            className={css.navlink}
            onClick={() => {
              fetchReviewsData(movieDetails.id);
            }}
            to="reviews"
          >
            reviews
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default MovieDetails;

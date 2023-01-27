import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Button from 'components/Button/Button';
import css from './MovieDetails.module.css';

const photoUrl = 'https://image.tmdb.org/t/p/w500/';

const MovieDetails = ({ movieDetails }) => {
  const location = useLocation();

  return movieDetails !== undefined ? (
    <div className={css.detailsWrapper}>
      <div className={css.movieWrapper}>
        <Button name="back" path={location.state.from}></Button>
        <img
          className={css.detailsImg}
          src={photoUrl + `${`${movieDetails.poster_path}`}`}
          alt={movieDetails.tags}
        ></img>
        <div className={css.movieDescription}>
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
        </div>
      </div>
      <div className={css.navigation}>
        <NavLink state={location.state.from} className={css.navlink} to="cast">
          cast
        </NavLink>
        <NavLink
          state={location.state.from}
          className={css.navlink}
          to="reviews"
        >
          reviews
        </NavLink>
      </div>
      <Outlet />
    </div>
  ) : (
    <div></div>
  );
};

export default MovieDetails;

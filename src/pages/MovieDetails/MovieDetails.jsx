import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchDetails } from 'services/api';
import Button from 'components/Button/Button';
import css from './MovieDetails.module.css';

const photoUrl = 'https://image.tmdb.org/t/p/w500/';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState();

  const fetchDetailsData = async movieId => {
    try {
      const movieDetails = await fetchDetails('movie', movieId);
      setMovieDetails(movieDetails);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    fetchDetailsData(movieId);
  }, [movieId]);

  const location = useLocation();
  const backLink = useRef(location.state.from ?? '/');

  return (
    movieDetails && (
      <div className={css.detailsWrapper}>
        <div className={css.movieWrapper}>
          <Button name="back" path={backLink.current}></Button>
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
          <NavLink state={{ backLink }} className={css.navlink} to="cast">
            cast
          </NavLink>
          <NavLink state={{ backLink }} className={css.navlink} to="reviews">
            reviews
          </NavLink>
        </div>
        <Outlet />
      </div>
    )
  );
};

MovieDetails.propTypes = {
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

export default MovieDetails;

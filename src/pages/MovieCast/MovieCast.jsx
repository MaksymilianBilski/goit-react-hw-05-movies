import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types'
import { fetchCredits } from 'services/fetch';
import css from './MovieCast.module.css';

const photo = 'https://image.tmdb.org/t/p/w500/';

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCredits, setMovieCredits] = useState();

  const fetchCreditsData = async movieId => {
    try {
      const movieCredits = await fetchCredits('movie', movieId);
      return setMovieCredits(movieCredits);
    } catch (error) {
      return;
    }
  };
  
  useEffect(() => {
    fetchCreditsData(movieId);
  }, [movieId]);

  return (
    movieCredits !== undefined && (
      <div className={css.castWrapper}>
        {movieCredits.cast.map(actor => (
          <figure className={css.figure}>
            <img
              className={css.img}
              alt={actor.character}
              src={photo + `${actor.profile_path}`}
            ></img>
            <figcaption className={css.figcaption}>
              <p className={css.p}>Actor name: {actor.original_name}</p>
              <p className={css.p}>Character: {actor.character}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    )
  );
};

MovieCast.propTypes = {
  fetchCreditsData: PropTypes.func,
  movieCredits: PropTypes.arrayOf(
    PropTypes.objectOf({
      profile_path: PropTypes.string,
      original_name: PropTypes.string,
      character: PropTypes.string,
    })
  ),
};

export default MovieCast;

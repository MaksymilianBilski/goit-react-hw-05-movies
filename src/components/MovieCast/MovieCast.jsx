import { useMoviesContext } from 'context/MoviesContext';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const photo = 'https://image.tmdb.org/t/p/w500/';
  const { movieCredits } = useMoviesContext();

  return movieCredits !== undefined ? (
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
  ) : (
    <></>
  );
};

export default MovieCast;

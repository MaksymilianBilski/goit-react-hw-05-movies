import { useMoviesContext } from 'context/MoviesContext';

const MovieCast = () => {
  const photo = 'https://image.tmdb.org/t/p/w500/';
  const { movieCredits } = useMoviesContext();
  console.log(movieCredits);
  return movieCredits !== undefined ? (
    <div>
      {movieCredits.cast.map(actor => (
        <figure>
          <img
            alt={actor.character}
            src={photo + `${actor.profile_path}`}
          ></img>
          <figcaption>
            <p>Actor name: {actor.original_name}</p>
            <p>Character: {actor.character}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  ) : (
    <></>
  );
};

export default MovieCast;

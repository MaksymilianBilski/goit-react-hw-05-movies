import { useParams } from 'react-router-dom';
import { useMoviesContext } from 'context/MoviesContext';
import { useEffect } from 'react';

const MovieDetails = () => {
  const { details, movieDetails } = useMoviesContext();
  const { movieId } = useParams();
  useEffect(() => {
    details(movieId);
  }, []);
  console.log(movieDetails);
  return (
    <div>
      <img
        src={
          movieDetails !== undefined
            ? 'https://image.tmdb.org/t/p/w500/' +
              movieDetails.data.backdrop_path
            : ''
        }
        alt={movieDetails !== undefined ? movieDetails.data.tags : ''}
      ></img>
    </div>
  );
};

export default MovieDetails;

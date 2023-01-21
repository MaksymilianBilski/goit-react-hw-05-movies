import { useParams } from 'react-router-dom';
import { useMoviesContext } from 'context/MoviesContext';

const MovieDetails = () => {
  const { details, movieDetails } = useMoviesContext();
  const { movieId } = useParams();
  details(movieId);
  console.log(movieDetails);
  return <div>test</div>;
};

export default MovieDetails;

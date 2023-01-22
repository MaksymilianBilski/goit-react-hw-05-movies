import { useMoviesContext } from 'context/MoviesContext';

const MovieDetails = () => {
  const { movieDetails } = useMoviesContext();
  console.log(movieDetails);
  return movieDetails !== undefined ? (
    <div>
      <img
        src={
          'https://image.tmdb.org/t/p/w500/' + movieDetails.data.backdrop_path
        }
        alt={movieDetails.data.tags}
      ></img>
      <div>
        <h1>
          {movieDetails.data.original_title
            ? `${movieDetails.data.original_title}`
            : `${movieDetails.data.name}`}
        </h1>
        <p>User Score: {movieDetails.data.vote_average}%</p>
        <h2>Overview</h2>
        <p>{movieDetails.data.overview}</p>
        <h3>Genres</h3>
        <p>{movieDetails.data.genres.map(el => el.name).join(', ')}</p>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default MovieDetails;

import { useMoviesContext } from 'context/MoviesContext';

const MovieList = () => {
  const { queryData } = useMoviesContext();
  return queryData.map(el => (
    <ul>
      <li>{el.name} i cos tam</li>
    </ul>
  ));
};

export default MovieList;

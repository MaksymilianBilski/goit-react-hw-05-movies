import { NavLink } from 'react-router-dom';
import { useMoviesContext } from 'context/MoviesContext';

const TrendingList = () => {
  const { fetchDetailsData, movies } = useMoviesContext();
  return (
    <ul>
      {movies.map(el => (
        <li
          key={el.id}
          onClick={() => {
            fetchDetailsData(el.id);
          }}
        >
          <NavLink to={`/movies/:${el.id}`}>
            {el.name !== undefined ? el.name : el.original_title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default TrendingList;

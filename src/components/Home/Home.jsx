import { NavLink } from 'react-router-dom';
import { useMoviesContext } from 'context/MoviesContext';
// import PropTypes from 'prop-types';

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
TrendingList.propTypes = {};

export default TrendingList;

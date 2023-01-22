import { NavLink } from 'react-router-dom';
import { useMoviesContext } from 'context/MoviesContext';
// import PropTypes from 'prop-types';

const TrendingList = ({ movies }) => {
  const { fetchDetailsData } = useMoviesContext();
  return (
    <ul>
      {movies.map(el => (
        <li
          key={el.id}
          onClick={() => {
            fetchDetailsData(el.id);
          }}
        >
          <NavLink to={`/movies/${el.id}`}>
            {el.title === null ? `${el.name}` : `${el.original_title}`}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
TrendingList.propTypes = {};

export default TrendingList;

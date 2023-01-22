import { NavLink } from 'react-router-dom';
import { useMoviesContext } from 'context/MoviesContext';
// import PropTypes from 'prop-types';

const TrendingList = ({ movies }) => {
  const { detailsData } = useMoviesContext();
  return (
    <ul>
      {movies.map(el => (
        <li
          key={el.id}
          onClick={() => {
            detailsData(el.id);
          }}
        >
          <NavLink to={`/movies/${el.id}`}>
            {el.original_title ? el.original_title : el.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
TrendingList.propTypes = {};

export default TrendingList;

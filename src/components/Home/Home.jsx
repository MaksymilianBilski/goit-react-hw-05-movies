import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const TrendingList = ({ movies }) => {

  return (
    <ul>
      {movies.map(el => (
        <li>
          <NavLink to={`${el.id}`}>
            <a alt={el.tags} href={el.backdrop_path}>
              {el.original_title ? el.original_title : el.name}
            </a>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
TrendingList.propTypes = {};

export default TrendingList;

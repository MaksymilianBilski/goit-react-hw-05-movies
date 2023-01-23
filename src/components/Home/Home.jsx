import { NavLink } from 'react-router-dom';
import { useMoviesContext } from 'context/MoviesContext';
import css from './Home.module.css';

const TrendingList = () => {
  const { fetchDetailsData, movies } = useMoviesContext();
  return (
    <ul className={css.list}>
      {movies.map(el => (
        <li
          className={css.listItem}
          key={el.id}
          onClick={() => {
            fetchDetailsData(el.id);
          }}
        >
          <NavLink className={css.navLink} to={`/movies/${el.id}`}>
            {el.name !== undefined ? el.name : el.original_title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default TrendingList;

import { useMoviesContext } from 'context/MoviesContext';
import { NavLink } from 'react-router-dom';
import css from './Movies.module.css';

const SearchMovies = () => {
  const { onSubmit, queryData, fetchDetailsData } = useMoviesContext();
  return (
    <div>
      <div>
        <form className={css.searchForm} onSubmit={onSubmit}>
          <input name="search" placeholder="type movie name"></input>
          <button type="submit">confirm</button>
        </form>
      </div>
      {queryData !== undefined && queryData.length > 0 && (
        <ul className={css.list}>
          {queryData.map(el => (
            <li
              className={css.listItem}
              key={el.id}
              onClick={() => {
                fetchDetailsData(el.id);
              }}
            >
              <NavLink className={css.navlink} to={`/movies/:${el.id}`}>
                {el.name !== undefined ? el.name : el.original_title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchMovies;

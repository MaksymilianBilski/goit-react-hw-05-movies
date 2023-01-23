import { NavLink } from 'react-router-dom';
import css from './Movies.module.css';

const SearchMovies = ({ handleSubmit, queryData, fetchDetailsData }) => {
  return (
    <div>
      <div>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <input
            className={css.input}
            name="search"
            placeholder="type movie name"
          ></input>
          <button className={css.button} type="submit">
            confirm
          </button>
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

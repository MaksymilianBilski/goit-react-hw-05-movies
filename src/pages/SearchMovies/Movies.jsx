import { NavLink, useSearchParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchByQuery } from 'services/api';
import css from './Movies.module.css';

const SearchMovies = () => {
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [queryData, setQueryData] = useState();

  const fetchQueryData = async (query, page) => {
    try {
      const queryData = await fetchByQuery(query, page);
      setQueryData(queryData);
    } catch (error) {}
  };

  const onSubmit = evt => {
    evt.preventDefault();
    const input = evt.target.search.value;
    setSearchParams('query=' + input);
    fetchQueryData(input, 1);
  };

  return (
    <div>
      <div>
        <form className={css.searchForm} onSubmit={onSubmit}>
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
            <li className={css.listItem} key={el.id}>
              <NavLink
                state={{ from: location.pathname + '&' + searchParams }}
                className={css.navlink}
                to={`/movies/${el.id}`}
              >
                {el.name !== undefined ? el.name : el.original_title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

SearchMovies.propTypes = {
  queryData: PropTypes.arrayOf(
    PropTypes.objectOf({
      id: PropTypes.number,
      original_title: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  onSubmit: PropTypes.func,
};

export default SearchMovies;

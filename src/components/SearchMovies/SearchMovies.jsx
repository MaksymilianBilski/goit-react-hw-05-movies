import { useMoviesContext } from 'context/MoviesContext';
import { NavLink } from 'react-router-dom';

const SearchMovies = () => {
  const { onSubmit, queryData, fetchDetailsData } = useMoviesContext();
  console.log(queryData);
  return (
    <div>
      <div>
        <form
          onSubmit={e => {
            onSubmit(e);
          }}
        >
          <input name="search" placeholder="type movie name"></input>
          <button type="submit">confirm</button>
        </form>
      </div>
      {queryData !== undefined && queryData.length > 0 && (
        <ul>
          {queryData.map(el => (
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
      )}
    </div>
  );
};

export default SearchMovies;

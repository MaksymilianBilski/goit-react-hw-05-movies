import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchTrending } from 'services/api';
import css from './Home.module.css';

const TrendingList = () => {
  const [movies, setMovies] = useState([]);

  const fetchTrendingData = async () => {
    try {
      const movies = await fetchTrending('trending', 'all/day', '1');
      setMovies(movies);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    fetchTrendingData();
  }, []);

  const location = useLocation();
  return (
    <ul className={css.list}>
      {movies.map(el => (
        <li className={css.listItem} key={el.id}>
          <NavLink
            state={{ from: location.pathname }}
            className={css.navLink}
            to={`/movies/${el.id}`}
          >
            {el.name !== undefined ? el.name : el.original_title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default TrendingList;

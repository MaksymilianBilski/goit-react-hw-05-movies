import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchReviews } from 'services/api';
import css from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState();

  const fetchReviewsData = async movieId => {
    try {
      const movieReviews = await fetchReviews('movie', movieId);
      setMovieReviews(movieReviews.results);
    } catch (error) {}
  };

  useEffect(() => {
    fetchReviewsData(movieId);
  }, [movieId]);

  return movieReviews !== undefined && movieReviews.length !== 0 ? (
    <div>
      Reviews:
      {movieReviews.map(el => (
        <ul className={css.list}>
          <li>
            <h3>
              AUTHOR: <span>{el.author}</span>
            </h3>
            <p className={css.text}>{el.content}</p>
          </li>
        </ul>
      ))}
    </div>
  ) : (
    <div>We don't have any reviews yet</div>
  );
};

Reviews.propTypes = {
  movieReviews: PropTypes.arrayOf(
    PropTypes.objectOf({
      author: PropTypes.string,
      content: PropTypes.string,
    })
  ),
  fetchReviewsData: PropTypes.func,
};

export default Reviews;

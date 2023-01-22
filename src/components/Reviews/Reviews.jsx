import { useMoviesContext } from 'context/MoviesContext';

const Reviews = () => {
  const { movieReviews } = useMoviesContext();
  return movieReviews !== undefined && movieReviews.length !== 0 ? (
    <div>
      Reviews:
      {movieReviews.map(el => (
        <ul>
          <li>
            <h3>
              AUTHOR: <span>{el.author}</span>
            </h3>
            <p>{el.content}</p>
          </li>
        </ul>
      ))}
    </div>
  ) : (
    <div>We don't have any reviews yet</div>
  );
};

export default Reviews;

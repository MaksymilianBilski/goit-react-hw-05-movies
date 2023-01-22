import { useMoviesContext } from 'context/MoviesContext';

const Reviews = () => {
  const { movieReviews } = useMoviesContext();
  return movieReviews !== undefined ? (
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
    <></>
  );
};

export default Reviews;

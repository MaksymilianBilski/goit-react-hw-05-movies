import css from './Reviews.module.css';

const Reviews = ({ movieReviews }) => {
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

export default Reviews;

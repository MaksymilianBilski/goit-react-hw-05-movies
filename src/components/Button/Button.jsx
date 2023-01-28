import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ path, name }) => {
  return (
    <NavLink to={path}>
      <button className={css.button} type="button">
        {name}
      </button>
    </NavLink>
  );
};

Button.propTypes = {
  path: PropTypes.string,
  name: PropTypes.string,
};

export default Button;

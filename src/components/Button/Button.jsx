import { NavLink } from 'react-router-dom';
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

export default Button;

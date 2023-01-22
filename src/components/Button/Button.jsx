// import { useState } from 'react';
// import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Button = ({ path, name }) => {
  return (
    <NavLink to={path}>
      <button type="button">{name}</button>
    </NavLink>
  );
};

export default Button;

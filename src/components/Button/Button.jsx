import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';

const Button = ({ name}) => {
  return (
    <NavLink to={name}>
      <button type="button">
        {name}
      </button>
    </NavLink>
  );
};

export default Button;

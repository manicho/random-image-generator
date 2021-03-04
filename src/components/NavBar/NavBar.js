import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.scss';

const NavBar = () => {
  return (
    <div>
      <ul className="d-flex justify-content-center">
        <li className="mr-5"><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
      <hr />
    </div>
  );
};

export default NavBar;
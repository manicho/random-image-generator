import React from 'react';
// import { Link } from 'react-router-dom';

import './NavBar.scss';

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" />
          RANDOM
        </a>
      </nav>
    </div>
  );
};

export default NavBar;
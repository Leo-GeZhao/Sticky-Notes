import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Sticky Notes
        </Link>
        <ul className="navbar-nav flex-row justify-content-end align-items-center">
          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/archives"
            >
              Archive
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

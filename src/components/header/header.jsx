import React from "react";
import {Link} from "react-router-dom";
import UserNav from "../user-menu/user-nav/user-nav";
import logo from "../../../public/img/logo.svg";


const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/" className="header__logo-link header__logo-link--active">
              <img className="header__logo" src={logo} alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <UserNav />
        </div>
      </div>
    </header>
  );
};

export default Header;

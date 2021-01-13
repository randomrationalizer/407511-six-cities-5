import React from "react";
import {Link} from "react-router-dom";
import logo from "../../../public/img/logo.svg";


const Footer = () => {
  return (
    <footer className="footer container">
      <Link className="footer__logo-link" to="/">
        <img className="footer__logo" src={logo} alt="6 cities logo" width="64" height="33" />
      </Link>
    </footer>
  );
};

export default Footer;

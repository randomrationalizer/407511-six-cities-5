import React from "react";
import {Link} from "react-router-dom";
import {AppRoute} from "../../../const";


const ProfileLinkUnauthorized = () => {
  return (
    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.LOGIN}>
      <div className="header__avatar-wrapper user__avatar-wrapper">
      </div>
      <span className="header__login">Sign in</span>
    </Link>
  );
};

export default ProfileLinkUnauthorized;

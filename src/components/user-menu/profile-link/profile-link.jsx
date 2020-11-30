import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {AppRoute} from "../../../const";

const avatarSize = {
  width: 54,
  height: 54
};

const ProfileLink = (props) => {
  const {userInfo} = props;

  return (
    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
      <div className="header__avatar-wrapper user__avatar-wrapper">
        <img
          className="user__avatar"
          src={userInfo.avatar_url}
          width={avatarSize.width}
          height={avatarSize.height}
          alt="User avatar"
        />
      </div>
      <span className="header__user-name user__name">{userInfo.email}</span>
    </Link>
  );
};

ProfileLink.propTypes = {
  userInfo: PropTypes.object.isRequired
};

const mapStateToProps = ({USER}) => ({
  userInfo: USER.userInfo
});

export {ProfileLink};
export default connect(mapStateToProps, null)(ProfileLink);

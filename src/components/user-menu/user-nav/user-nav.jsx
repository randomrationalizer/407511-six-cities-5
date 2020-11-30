import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import ProfileLink from "../profile-link/profile-link";
import ProfileLinkUnauthorized from "../profile-link-unauthorized/profile-link-unauthorized";
import {AuthorizationStatus} from "../../../const";


const UserNav = (props) => {
  const {authorizationStatus, userInfo} = props;
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          {isAuthorized ?
            <ProfileLink userInfo={userInfo} />
            :
            <ProfileLinkUnauthorized />
          }
        </li>
      </ul>
    </nav>
  );
};

UserNav.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  userInfo: PropTypes.object
};

const mapStateToProps = ({USER}) => ({
  authorizationStatus: USER.authorizationStatus,
  userInfo: USER.userInfo
});

export {UserNav};
export default connect(mapStateToProps, null)(UserNav);


import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';

export const PrivateHeader = (props) => {
  const navImageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';

  return (
    <div className="header">
      <div className="header__content">
        <img className='header__nav-toggle' src={navImageSrc} onClick={() => props.handleNavToggle(props.isNavOpen)} />
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={() => props.handleLogout()}>LOGOUT</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isNavOpen: PropTypes.bool.isRequired,
  handleNavToggle: PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout(),
    handleNavToggle: (isNavOpen) => Session.set('isNavOpen', !isNavOpen),
    isNavOpen: Session.get('isNavOpen')
  };
}, PrivateHeader);

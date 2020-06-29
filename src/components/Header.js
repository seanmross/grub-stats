import React from "react";
import logo from '../img/logo.svg';

const logoStyle = {
  width: '60px',
  paddingLeft: '16px'
}

const Header = (props) => (
  <div className="header">
    <div className="container container--flex-col">
      <div className="header__upper">
        <h1 className="header__title">{props.title}</h1>
        <img alt="logo" src={logo} style={logoStyle} />
      </div>
      <div>
        <p className="header__subtitle">{props.subtitle}</p>
      </div>
    </div>
  </div>
);

export default Header;

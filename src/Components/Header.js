import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Avatar } from "../Assets/man.svg";
import { ReactComponent as Home } from "../Assets/house-outline.svg";
import { connect } from "react-redux";
import "./Header.scss";
const Header = ({ username, score }) => {
  return (
    <header className="headerComponent">
      <nav className="navBar">
        <Link to="/" className="plain">
          <span className="navItem">
            <Home className="logo" />
            <span className="currentUser">End Game</span>
          </span>
        </Link>
        {score ? (
          <Link to="/score">
            <button className="continueButton">Continue</button>
          </Link>
        ) : (
          ""
        )}
        {username ? (
          <span className="navItem">
            <Avatar className="logo" />
            <span className="currentUser">{username}</span>
          </span>
        ) : (
          <></>
        )}
      </nav>
    </header>
  );
};
const mapStateToProps = (state) => {
  return {
    username: state.game.currentuser,
    score: state.game.score,
  };
};
export default connect(mapStateToProps)(Header);

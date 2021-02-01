import React, { useState } from "react";
import { ReactComponent as Logo } from "../Assets/Live-Background.svg";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentUser } from "../Redux/Actions/GameAction";
import "./HomePage.scss";

const HomePage = ({ setuser }) => {
  const [inputValue, setInputValue] = useState("");
  const history = useHistory();
  const onClickHandler = () => {
    setuser(inputValue);
    history.push("/game");
  };
  return (
    <div className="wrapper">
      <Logo className="backGroundSvg" />
      <div class="formWrapper">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            required
            onChange={(e) => setInputValue(e.target.value)}
          />
          <input onClick={onClickHandler} disabled={inputValue.length === 0} value="Start"/>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setuser: (username) => dispatch(setCurrentUser(username)),
});
export default connect(null, mapDispatchToProps)(HomePage);

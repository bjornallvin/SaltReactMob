import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginAsync,
  logoutAsync,
  selectApiStatus,
  selectIsLoggedIn,
  selectUserInfo,
} from "./authSlice";
import styles from "./Auth.module.css";

const Auth = () => {
  const userInfo = useSelector(selectUserInfo);
  const apiStatus = useSelector(selectApiStatus);
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({ userId: "", password: "" });

  const onChange = (e) => {
    setUserInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  if (userInfo.isLoggedIn) {
    return (
      <div className={styles.wrapper}>
        <div>{userInfo.userId}</div>
        <div>Your bank is : {userInfo.bank}</div>
        <button onClick={() => dispatch(logoutAsync(userInfo.userId))}>
          Log out
        </button>
      </div>
    );
  }
  return (
    <div className={styles.wrapper} data-testid="wrapping">
      <input
        type="text"
        name="userId"
        value={userInput.userId}
        onChange={onChange}
        data-testid="username"
      />
      <input
        type="password"
        name="password"
        value={userInput.password}
        onChange={onChange}
        data-testid="password"
      />
      <button type="button" onClick={() => dispatch(loginAsync(userInput))}>
        {apiStatus === "loading" ? "Loading..." : "Login"}
      </button>
      {apiStatus === "failed" && <div>Failed to login</div>}
    </div>
  );
};

export default Auth;

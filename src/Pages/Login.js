import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Sidebar from "./Sidebar";
import "./login.scss";


function Login(props) {
  const { setActiveUser, isLoggedIn, setLoginStatus } = props;
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [logged, setLogged] = useState(false); // Invalid username or password notification
  const [exists, setExists] = useState(false); // Username is taken notification
  const nav = useNavigate();

  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: process.env.REACT_APP_BACKEND_URL + "/register",
    }).then((res) => {
      console.log(res);
      if (res.data !== "Invalid") {
        setActiveUser(res.data);
        setLoginStatus(true);
        nav("/");
      } else {
        setExists(true);
      }
    });
  };
  
  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: process.env.REACT_APP_BACKEND_URL + "/login",
    }).then((res) => {
      if (res.data !== "Invalid") {
        setActiveUser(res.data);
        setLoginStatus(true);
        nav("/");
      } else {
        setLogged(true);
      }
    });
  };

  return (
    <div>
      <Sidebar isLoggedIn={isLoggedIn} />
      <div className="base-containers1">
        <div className="content">
          <div className="form">
            <h1 className="h1">Register</h1>
            <div className="form-group">
              <input
                type="text"
                placeholder="username"
                onChange={(e) => setRegisterUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <div className="footer">
              <button className="button" onClick={register}>
                Register
              </button>
            </div>
            {exists ? <h5>Username is taken! Try a different one.</h5> : null}
          </div>

          <div className="form">
            <h1 className="h1">Login</h1>
            <div className="form-group">
              <input
                type="text"
                placeholder="username"
                onChange={(e) => setLoginUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <div className="footer">
              <button
                className="button"
                href="/Account"
                onClick={() => {
                  login();
                }}
              >
                Login
              </button>
            </div>
            {logged ? <h5>Invalid username or password. Try Again!</h5> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { Fragment, useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

import LockIcon from "@mui/icons-material/Lock";

import PersonIcon from "@mui/icons-material/Person";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ButtonLoader from "../loader/ButtonLoader";
import { useStateValue } from "../../context/StateContext";
export default function LoginSignup() {
  const navigate = useNavigate();
  const { user, handleLogin, error, clearError, showNotificationMessage,setShowNotificationMessage } =
    useStateValue();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const loginSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    handleLogin(username, password);
  };
  useEffect(() => {
    if (user) {
      if (showNotificationMessage) {
        toast.success(showNotificationMessage, {
          position: "top-right",
          autoClose: 3000,

          theme: "dark",
        });
        setShowNotificationMessage('')
      }


      navigate("/");
    }
    if (error) {
      toast.error(error, { theme: "dark" });
      clearError();
      setDisabled(false);
    }
  }, [user, error]);

  return (
    <Fragment>
      <div className="login__container">
        <div className="login__box">
          <div>
            <div className="login__heading">
              <p>LOGIN</p>
            </div>
          </div>
          <form className="login__form" onSubmit={loginSubmit}>
            <div className="login__email">
              <PersonIcon />
              <input
                type="text"
                placeholder="username"
                required
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>

            <div className="login__password">
              <LockIcon />
              <input
                type="password"
                placeholder="password"
                required
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>

            <button disabled={disabled} type="submit" className="login__btn">
              {disabled ? <ButtonLoader /> : "Login"}
            </button>
          </form>
        </div>
      </div>
     
    </Fragment>
  );
}

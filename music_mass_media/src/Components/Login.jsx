import React, { useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { UserDataContext } from "../App";
import { TextField, Snackbar, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export function Login() {
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const { userData, setUser } = useContext(UserDataContext);

  const handleLogin = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const reload = () => window.location.reload();

  async function login(data) {
    const response = await fetch("http://localhost:8000/auth", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      let jwt = await response.json();
      setCookieJWT("jwt", jwt);
      history.push("/profile");
      reload();
    } else {
      setOpen(true);
    }
  }

  async function getUser() {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;

    const response = await fetch("http://localhost:8000/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });

    if (response.status === 200) {
      let res = await response.json();
      console.log(res);
      setUser(res);
    }
  }

  useEffect(() => {
    if (cookieJWT["jwt"] !== undefined) {
      getUser();
    }
  }, []);

  const handleSubmit = (event) => {
    const inputData = { email, password };
    login(inputData);

    event.preventDefault();
  };

  return (
    <div class="row">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          Incorrect Login or Password!
        </Alert>
      </Snackbar>
      <form class="col s4 offset-s4" onSubmit={handleSubmit}>
        <div class="row">
          <div class="input-field col s12">
            <input
              id="email"
              type="email"
              class="validate"
              value={email}
              onChange={handleLogin}
            />
            <label for="email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              id="password"
              type="password"
              class="validate"
              value={password}
              onChange={handlePassword}
            />
            <label for="password">Password</label>
          </div>
        </div>
        <button
          class="btn waves-effect right"
          type="submit"
          name="action"
          style={{ backgroundColor: "#ee6e73" }}
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}

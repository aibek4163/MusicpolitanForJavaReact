import React, { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "../App";
import { TextField, Snackbar, Button } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Avatar({ avatar }) {
  return (
    <div className="main_wrapper">
      <div className="col s3">
        <img class="responsive-img" src={avatar} alt="" />
        <form action="#">
          <div class="file-field input-field">
            <div class="btn" style={{ backgroundColor: "#ee6e73" }}>
              <span>File</span>
              <input type="file" />
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" />
            </div>
          </div>
          <button
            class="btn waves-effect right"
            type="submit"
            name="action"
            style={{ backgroundColor: "#ee6e73" }}
          >
            UPLOAD
          </button>
        </form>
      </div>
    </div>
  );
}

function EditProfile({ email, fullName, id, setFullName }) {
  const { cookieJWT, removeCookieJWT } = useContext(AuthContext);
  const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;

  const handleFullName = (event) => {
    console.log(event.target.value);
    setFullName(event.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function updateFullname(inputData) {
    //const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;

    const response = await fetch("http://localhost:8000/api/updateUser", {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(inputData),
    });
    if (response.status === 200) {
      let res = await response.json();
      console.log(res);
      setOpen(true);
      setFullName(res["fullName"]);
    }
  }

  const handleSubmit = (event) => {
    const data = { id, email, fullName };
    updateFullname(data);
    event.preventDefault();
  };

  return (
    <form class="col s4 offset-s1" onSubmit={handleSubmit}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Succesfully changed!
        </Alert>
      </Snackbar>
      <div class="row">
        <TextField
          label="Email"
          type="email"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          multiline
          value={email}
          readOnly
        />
      </div>
      <div class="row">
        <TextField
          label="Full Name"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleFullName}
          multiline
          value={fullName}
        />
        <div class="input-field col s12"></div>
      </div>
      <button
        class="btn waves-effect right"
        type="submit"
        name="action"
        style={{ backgroundColor: "#ee6e73" }}
      >
        Edit
      </button>
    </form>
  );
}

function ChangePassword({ email, id }) {
  const [old, setOld] = useState("");
  const [newPass, setNew] = useState("");
  const [renew, setReNew] = useState("");
  const [updated, setUpdated] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClick2 = () => {
    setOpen2(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
  };

  const { cookieJWT, removeCookieJWT } = useContext(AuthContext);
  const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;

  const handleOld = (event) => {
    setOld(event.target.value);
  };

  const handleNew = (event) => {
    setNew(event.target.value);
  };

  const handleReNew = (event) => {
    setReNew(event.target.value);
  };

  async function updatePassword(inputData) {
    //const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;

    const response = await fetch("http://localhost:8000/api/updatePassword", {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(inputData),
    });
    if (response.status === 200) {
      let res = await response.json();
      setUpdated(true);
      setOpen2(true);
      console.log(res);
    } else {
      setOpen(true);
    }
  }

  const handleSubmit = (event) => {
    // if (newPass !== renew) {
    // }
    const data = {
      email: email,
      password: old,
      newPassword: newPass,
      rePassword: renew,
    };
    updatePassword(data);
    event.preventDefault();
  };

  return (
    <>
      <div className="main_wrapper">
        <div className="col s3"></div>
      </div>
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="success">
          Passwords changed successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          Wrong passwords!
        </Alert>
      </Snackbar>
      <form class="col s4 offset-s1" onSubmit={handleSubmit}>
        <div class="row">
          <div class="input-field col s12">
            <input
              id="old_password"
              type="password"
              class="validate"
              onChange={handleOld}
            />
            <label for="old_password">Old Password</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              id="new_password"
              type="password"
              class="validate"
              onChange={handleNew}
            />
            <label for="new_password">New Password</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              id="repassword"
              type="password"
              class="validate"
              onChange={handleReNew}
            />
            <label for="repassword">Repeat New Password</label>
          </div>
        </div>
        <button
          class="btn waves-effect right"
          type="submit"
          name="action"
          style={{ backgroundColor: "#ee6e73" }}
        >
          Change Password
        </button>
      </form>
    </>
  );
}

export function Profile() {
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);
  console.log(cookieJWT["jwt"]);

  const [userData, setData] = useState([]);
  const [id, setId] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

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
      setData(res);
      setFullName(res.fullName);
      setEmail(res.email);
      setAvatar(res.avatar);
      setId(res.id);
    }
  }

  useEffect(() => {
    if (cookieJWT["jwt"] !== undefined) {
      getUser();
    }
  }, []);
  return (
    <>
      <div className="row">
        <Avatar avatar={avatar} />
        <EditProfile
          email={email}
          fullName={fullName}
          setFullName={setFullName}
          id={id}
        />
      </div>
      <div className="row">
        <ChangePassword email={email} id={id} />
      </div>
    </>
  );
}

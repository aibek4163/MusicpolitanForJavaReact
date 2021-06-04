import React, { useState } from "react";

export function Register(props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPass] = useState("");

  const handleFullName = (event) => {
    setFullName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleRepeatPass = (event) => {
    setRepeatPass(event.target.value);
  };

  async function register(data) {
    const response = await fetch("http://localhost:8000/api/register", {
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
      let messData = await response.json();
      console.log(messData);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
      fullName: fullName,
      avatar:
        "https://cdn.shortpixel.ai/client/to_avif,q_glossy,ret_img,w_460,h_460/https://www.humanitariantraining.com/wp-content/uploads/2018/09/avatar.png",
    };
    console.log(data);
    register(data);
  };

  return (
    <div class="row">
      <form class="col s4 offset-s4" onSubmit={handleSubmit}>
        <div class="row">
          <div class="input-field col s12">
            <input
              id="fullName"
              type="text"
              class="validate"
              value={fullName}
              onChange={handleFullName}
            />
            <label for="fullName">Full Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input
              id="email"
              type="email"
              class="validate"
              value={email}
              onChange={handleEmail}
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
        <div class="row">
          <div class="input-field col s12">
            <input
              id="repassword"
              type="password"
              class="validate"
              value={repeatPassword}
              onChange={handleRepeatPass}
            />
            <label for="repassword">Repeat Password</label>
          </div>
        </div>
        <button
          class="btn waves-effect right"
          type="submit"
          name="action"
          style={{ backgroundColor: "#ee6e73" }}
        >
          REGISTER
        </button>
      </form>
    </div>
  );
}

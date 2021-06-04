import React, { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
import { AuthContext, UserDataContext } from "../App";

export function Navbar() {
  //const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);
  const { cookieJWT, removeCookieJWT } = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [auth, setAuth] = useState(false);

  const { userData, setUser } = useContext(UserDataContext);

  console.log(userData);
  useEffect(() => {}, [userData]);

  const history = useHistory();

  useEffect(() => {
    if (cookieJWT["jwt"] !== undefined) {
      getUser();
      setAuth(true);
    } else {
      //reload();
    }
    //getUser();
  }, []);

  const Logout = () => {
    removeCookieJWT("jwt");
    setAuth(false);
    setFullName("");
    setEmail("");
    setAvatar("");
    history.push("/login");
    const reload = () => window.location.reload();
    reload();
  };

  useEffect(() => {}, []);

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
      setAuth(true);
      setFullName(res.fullName);
      setEmail(res.email);
      setAvatar(res.avatar);
      setUser(res);
    }
  }

  // useEffect(() => {
  //   if (cookieJWT["jwt"] !== undefined) {
  //     getUser();
  //   }
  // }, []);

  return (
    <>
      <nav class="nav-extended">
        <div class="main_wrapper">
          <div class="nav-wrapper">
            <Link to="/" class="brand-logo center logo">
              MUSICPOLITAN
            </Link>
            <ul id="nav-mobile" class="left hide-on-med-and-down">
              {/* <li>
                <Link to="#">
                  <i class="fas fa-search"></i>
                </Link>
              </li> */}
              {userData.fullName !== undefined ? (
                <>
                  <li>
                    <Link to="/profile">
                      <span>{userData.fullName}</span>
                    </Link>
                  </li>
                  <li>
                    <span onClick={Logout}>
                      <i class="fas fa-sign-out-alt"></i>
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">
                      <i class="fas fa-sign-in-alt"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
                      <i class="fas fa-user-plus"></i>
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <ul id="nav-mobile" class=" right hide-on-med-and-down ">
              <li>
                <a href="#">
                  <i class="fab fa-telegram-plane"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fab fa-vk"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="nav-content">
            <ul class="tabs tabs-transparent ">
              <div class="flexbox">
                <li class="tab ">
                  <Link to="/allnews">News</Link>
                </li>
                <li class="tab">
                  <a href="#test2">Releases</a>
                </li>
                <li class="tab">
                  <a href="#test3">Top 10</a>
                </li>
                <li class="tab">
                  <a href="#test4">Reviews</a>
                </li>
                <li class="tab">
                  <Link to="/allarticles">Articles</Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

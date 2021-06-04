import "./App.css";

import { Main } from "./Components/Main";
import { Dashboard } from "./Components/Admin/Dashboard";
import { Route, Switch } from "react-router-dom";
import { useCookies } from "react-cookie";
import React, { useState, createContext } from "react";

import { Navbar } from "./Components/Header";
import { Banner } from "./Components/Banner";
import { News } from "./Components/News";
import { Reviews } from "./Components/Reviews";
import { TopChart } from "./Components/TopMusic";
import { Footer } from "./Components/Footer";
import { ImgMediaCard } from "./Components/Articles";
import { Login } from "./Components/Login";
import { Register } from "./Components/Registration";
import { Profile } from "./Components/Profile";
import { AdminProfile } from "./Components/Admin/AdminProfile";
import {
  ArticleDetails,
  NewsDetails,
  ReviewDetails,
} from "./Components/Details";
import { AllNews } from "./Components/AllNews";
import { AllArticles } from "./Components/AllArticles";

export const AuthContext = createContext();
export const UserDataContext = createContext();

function App() {
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);
  const [userData, setUser] = useState({});
  return (
    <AuthContext.Provider value={{ cookieJWT, setCookieJWT, removeCookieJWT }}>
      <UserDataContext.Provider value={{ userData, setUser }}>
        <Switch>
          <Route path="/admin">
            <Dashboard />
          </Route>
        </Switch>
        <Switch>
          {/* <Main /> */}
          <Route exact path="/">
            <Navbar />
            <Banner />
            <News />
            <Reviews />
            <TopChart />
            <ImgMediaCard />
          </Route>
          <Route exact path="/login">
            <Navbar />
            <Login />
          </Route>
          <Route exact path="/register">
            <Navbar />
            <Register />
          </Route>
          <Route exact path="/profile">
            <Navbar />
            <Profile />
          </Route>
          <Route exact path="/allnews">
            <Navbar />
            <AllNews />
          </Route>
          <Route exact path="/allarticles">
            <Navbar />
            <AllArticles />
          </Route>
          <Route exact path="/adminprofile">
            <Navbar />
            <AdminProfile />
          </Route>
          <Route exact path="/detailsNews/:news_id">
            <Navbar />
            <NewsDetails />
          </Route>
          <Route exact path="/detailsReview/:review_id">
            <Navbar />
            <ReviewDetails />
          </Route>
          <Route exact path="/detailsArticle/:article_id">
            <Navbar />
            <ArticleDetails />
          </Route>
        </Switch>
        <div style={{ minHeight: "300px" }}></div>
        <Footer />
      </UserDataContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;

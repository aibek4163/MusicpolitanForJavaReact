import { Navbar } from "./Header";
import { Banner } from "./Banner";
import { News } from "./News";
import { Reviews } from "./Reviews";
import { TopChart } from "./TopMusic";
import { Footer } from "./Footer";
import { ImgMediaCard } from "./Articles";
import { Login } from "./Login";
import { Register } from "./Registration";
import { Profile } from "./Profile";
import { AdminProfile } from "./Admin/AdminProfile";
import { ArticleDetails, NewsDetails, ReviewDetails } from "./Details";

import { Route, Switch } from "react-router-dom";
import { useState } from "react";

export function Main() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <div>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <Switch>
        <Route path="/home">
          <Banner />
          <News />
          <Reviews />
          <TopChart />
          <ImgMediaCard />
        </Route>
        <Route path="/login">
          <Login isAuth={isAuth} setIsAuth={setIsAuth} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/adminprofile">
          <AdminProfile />
        </Route>
        <Route path="/detailsNews/:news_id">
          <NewsDetails />
        </Route>
        <Route path="/detailsReview/:review_id">
          <ReviewDetails />
        </Route>
        <Route path="/detailsArticle/:article_id">
          <ArticleDetails />
        </Route>
      </Switch>
      <div style={{ minHeight: "300px" }}></div>
      <Footer />
    </div>
  );
}

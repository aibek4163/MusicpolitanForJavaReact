import { useEffect, useState } from "react";
import { Row, Parallax } from "react-materialize";
import { Link } from "react-router-dom";
import axios from "axios";

export function News(props) {
  const [newsList, setListNews] = useState([]);

  

  async function loadNews() {
    let response = await fetch("http://localhost:8000/api/news", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      let listNews = await response.json();
      console.log(listNews);
      setListNews(listNews);
    }
  }

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <div className="main_wrapper">
      <h3>News</h3>
      
      <div className="news_wrapper">
        <Row>
          {newsList?.map((row) => (
            <div class="col m3 s12">
              <div class="card">
                <div
                  style={{
                    backgroundImage: `url(${row.image})`,
                    backgroundRepeat: "no-repeat",
                    height: "50vh",
                    backgroundSize: "cover",
                    backgroundPosition: "50% 0",
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-end",
                    cursor: "pointer",
                  }}
                ></div>
                <a href={`/detailsNews/${row.id}`}>
                  <div class="card-content card-hover card-bottom white-text text-darken-4">
                    <h6>{row.title}</h6>
                    <p>{row.shortDescription}</p>
                    <p style={{ paddingTop: "5px" }} className="right">
                      {row.date}
                    </p>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </Row>
        <div className="center-align">
          <Link
            to="/allnews"
            class="waves-effect waves-light btn center"
            style={{ marginBottom: "15px" }}
          >
            See all news
          </Link>
        </div>
      </div>
    </div>
  );
}


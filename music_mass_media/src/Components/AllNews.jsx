import { useEffect, useState } from "react";
import { Row, Parallax } from "react-materialize";
import { Link } from "react-router-dom";
import axios from "axios";

export function AllNews(props) {
  const [newsList, setListNews] = useState([]);

  const [name, setName] = useState("");
  const [newId, setNewId] = useState(0);
  const [addedDate, setDate] = useState("");
  const [isSearched, setSearched] = useState(false);
  const [listCard, setCard] = useState([]);
  const [searchName, setSearchName] = useState("");

  async function loadNews() {
    let response = await fetch("http://localhost:8000/api/allnews", {
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
      <SearchCard
        isSearched={isSearched}
        setSearched={setSearched}
        listCard={listCard}
        setCard={setCard}
        setSearchName={setSearchName}
      />
      {isSearched === true && searchName.length !== 0 ? (
        <ResultSearch
          listCard={listCard}
          setSearchName={setSearchName}
          searchName={searchName}
        />
      ) : (
        <div></div>
      )}
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
      </div>
    </div>
  );
}

function SearchCard(props) {
  const [name, setName] = useState("");
  const [colorCustom, setColor] = useState("#21598A");
  const [iconColor, setIconColor] = useState("white");
  const [cancelSearch, setCancel] = useState(false);

  const handleName = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
    // searchData(name);
    // setColor("white");
    // setIconColor("black");
    // setCancel(true);
  };

  const handleCancel = (event) => {
    event.target.value = "";
    setName("");
    props.setSearchName("");
    setCancel(false);
    setColor("#21598A");
    setIconColor("white");
    props.setSearched(false);
  };

  const handleColor = (event) => {
    setColor("white");
    setIconColor("black");
    setCancel(true);
  };

  const handleSubmit = (event) => {
    setName("");
    event.preventDefault();
  };

  const changeColor = (event) => {
    setColor("white");
  };

  async function searchData(name) {
    // const response = await fetch(
    //   "http://localhost:8000/api/searchCard/" + name
    // );
    // let messData = await response.json();
    // console.log(messData);
    // setCard(messData);
    // setName("");
    // if (name === "") {
    //   name = " ";
    // }
    axios
      .get(`http://localhost:8000/api/searchCard/${name}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          props.setCard(response.data);
          props.setSearched(true);
        }
      });
    props.setSearchName(name);
  }

  useEffect(() => {
    searchData(name);
  }, [name]);

  return (
    <>
      <div className="input-group input-group-lg">
        <div className="input-group-prepend">
          <div
            className="input-group-text"
            id="btnGroupAddon"
            style={{ backgroundColor: colorCustom }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill={iconColor}
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
        </div>
        <input
          className="form-control "
          style={{ backgroundColor: colorCustom }}
          onChange={handleName}
          onFocus={handleColor}
          value={name}
          // onClick={changeColor}
        />
        {cancelSearch === true ? (
          <div className="input-group-append ">
            <button
              onClick={handleCancel}
              className="input-group-text bg-white"
              id="basic-addon2"
            >
              X
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

function ResultSearch(props) {
  return (
    <>
      <h4 className="mt-3">Search results for:"{props.searchName}"</h4>
      {props.listCard.length === 0 ? (
        <div className="offset-4 col-4 mt-5">
          <h1>Results Not Found</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            fill="red"
            className="bi bi-slash-circle"
            style={{ marginLeft: "5rem" }}
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z" />
          </svg>
        </div>
      ) : (
        <>
          <Row>
            {props.listCard?.map((row) => (
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
        </>
      )}
    </>
  );
}

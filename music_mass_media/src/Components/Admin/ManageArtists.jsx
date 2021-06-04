import React, { useState, useEffect } from "react";
import { useStyles } from "./Styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import Title from "./Title";
import TextField from "@material-ui/core/TextField";
import { Link, Route, Switch, useParams, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";

function preventDefault(event) {
  event.preventDefault();
}

export function Artists({ id, setID }) {
  const classes = useStyles();
  const [artistList, setArtistList] = useState([]);

  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);
  const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;

  async function LoadReview() {
    let response = await fetch("http://localhost:8000/api/artist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    if (response.status === 200) {
      let artists = await response.json();
      setArtistList(artists);
    }
  }

  const columns = [
    { field: "id", headerName: "ID", width: 100, editable: true },
    { field: "username", headerName: "Username", width: 500, editable: true },
    {
      field: "photo",
      headerName: "Photo",
      width: 400,
      editable: true,
      renderCell: (params) => {
        const api = params.api;
        const fields = api
          .getAllColumns()
          .map((c) => c.field)
          .filter((c) => c !== "__check__" && !!c);
        const thisRow = {};

        fields.forEach((f) => {
          thisRow[f] = params.getValue(f);
        });

        return (
          <>
            {/* <p value={thisRow["id"]}>{thisRow.users.email}</p> */}
            <img width="30%" src={thisRow.photo} alt="#" />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    LoadReview();
  }, [id]);

  return (
    <div style={{ height: 1000, width: "100%" }}>
      <Button>
        <Link variant="contained" color="primary" to="/admin/addartist">
          ADD NEW ARTIST
        </Link>
      </Button>
      <DataGrid
        rowHeight={150}
        rows={artistList}
        columns={columns}
        pageSize={20}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
}

export function AddArtist({ id, setID }) {
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);

  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState("");

  const history = useHistory();

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePhoto = (event) => {
    setPhoto(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: username,
      photo: photo,
    };
    console.log(data);
    AddArtist(data);
    history.push("/admin/manageartists");
  };

  async function AddArtist(artist) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    const response = await fetch("http://localhost:8000/api/artist", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(artist),
    });

    let messData = await response.json();
    setID(messData.id);
  }

  return (
    <div className={classes.root}>
      <div className="row">
        <div className="col s10 offset-s1">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              multiline
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleUsername}
            />
            <TextField
              label="Photo"
              style={{ margin: 8 }}
              multiline
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handlePhoto}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
            >
              + ADD
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

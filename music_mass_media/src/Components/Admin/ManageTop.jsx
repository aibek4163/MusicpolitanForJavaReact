import React, { useState, useEffect } from "react";
import { useStyles } from "./Styles";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Link, Route, Switch, useParams, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@material-ui/core";

function preventDefault(event) {
  event.preventDefault();
}

export function Top({ id, setID }) {
  const classes = useStyles();
  const [listSongs, setSongs] = useState([]);

  const [song, setReleaseToDel] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openInPopup = (obj) => {
    setReleaseToDel(obj);
    handleClickOpen();
  };

  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);
  const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;

  async function LoadSongs() {
    let response = await fetch("http://localhost:8000/api/song", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    if (response.status === 200) {
      let songs = await response.json();
      setSongs(songs);
    }
  }

  async function DeleteSong(obj) {
    const response = await fetch("http://localhost:8000/api/song/", {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(obj),
    });
    let delData = await response.json();
    setID(delData.id);
    handleClose();
  }

  const columns = [
    { field: "id", headerName: "ID", width: 100, editable: true },
    { field: "rating", headerName: "Rating", width: 100, editable: true },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: true,
    },
    { field: "duration", headerName: "Duration", width: 150 },
    { field: "image", headerName: "Image", width: 150 },
    {
      field: "genre",
      headerName: "Genre",
      width: 150,
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
            <p value={thisRow["id"]} color="primary">
              {thisRow.genre.name}
            </p>
          </>
        );
      },
    },
    {
      field: "artist",
      headerName: "Artist",
      width: 150,
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
            <p value={thisRow["id"]} color="primary">
              {thisRow.artist.username}
            </p>
          </>
        );
      },
    },
    {
      field: "options",
      headerName: "Options",
      width: 150,

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
            <Button href={`/admin/editSong/${thisRow["id"]}`} color="primary">
              EDIT
            </Button>
            <Button
              color="primary"
              onClick={() => {
                openInPopup(thisRow);
              }}
            >
              DELETE
            </Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    LoadSongs();
  }, [id]);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Button>
        <Link variant="contained" color="primary" to="/admin/addmusic">
          ADD NEW SONG
        </Link>
      </Button>
      <DataGrid
        rows={listSongs}
        columns={columns}
        pageSize={20}
        components={{
          Toolbar: GridToolbar,
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Deleting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete this Release "{song["name"]}"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              DeleteSong(song);
            }}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function AddMusic({ id, setID }) {
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);

  const classes = useStyles();

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);
  const [author, setAuthor] = useState({});
  //const [authorId, setAuthorID] = useState(0);
  //const [genreId, setGenreId] = useState(0);
  const [genre, setGenre] = useState({});

  const [genreList, setGenreList] = useState([]);
  const [artistList, setArtistList] = useState([]);

  const history = useHistory();

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleDuration = (event) => {
    setDuration(event.target.value);
  };

  const handleImage = (event) => {
    setImage(event.target.value);
  };

  const handleRating = (event) => {
    let d = parseFloat(event.target.value);
    setRating(d);
  };

  const handleAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handleGenre = (event) => {
    setGenre(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let date = new Date().toLocaleString().replace(/(.*)\D\d+/, "$1");
    const data = {
      name: name,
      duration: duration,
      image: image,
      rating: rating,
      genre: genre,
      artist: author,
      date: date,
    };
    console.log(data);
    addSong(data);
    history.push("/admin/managetop");
  };

  useEffect(() => {
    GetGenres();
    GetArtists();
  }, []);

  async function GetGenres() {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch("http://localhost:8000/api/genre", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    if (response.status === 200) {
      let genres = await response.json();
      let list = genres.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      list = [{ id: 0, name: "Select" }].concat(list);
      setGenreList(list);
      console.log(list);
    }
  }

  async function GetArtists() {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch("http://localhost:8000/api/artist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    if (response.status === 200) {
      let artists = await response.json();
      let list = artists.map((item) => ({
        id: item.id,
        username: item.username,
      }));
      list = [{ id: 0, username: "Select" }].concat(list);
      setArtistList(list);
      console.log(list);
    }
  }

  async function addSong(song) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    const response = await fetch("http://localhost:8000/api/song", {
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
      body: JSON.stringify(song),
    });

    let messData = await response.json();
    setID(messData.id);
  }

  return (
    <div className={classes.root}>
      <div className="row">
        <div className="col s6 offset-s3">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              multiline
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleName}
            />
            <TextField
              label="Duration"
              style={{ margin: 8 }}
              multiline
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleDuration}
            />
            <TextField
              label="Image"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              multiline
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleImage}
              variant="outlined"
            />
            <TextField
              label="Rating"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleRating}
              variant="outlined"
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Genre
              </InputLabel>
              <MuiSelect
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={handleGenre}
                label="Age"
              >
                {genreList.map((item) => (
                  <MenuItem key={item.id} value={item}>
                    {item.name}
                  </MenuItem>
                ))}
              </MuiSelect>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Artist
              </InputLabel>
              <MuiSelect
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={handleAuthor}
                label="Age"
              >
                {artistList.map((item) => (
                  <MenuItem key={item.id} value={item}>
                    {item.username}
                  </MenuItem>
                ))}
              </MuiSelect>
            </FormControl>

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

export function EditMusic({ id, setID }) {
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);

  const classes = useStyles();

  let { song_id } = useParams();

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);
  const [author, setAuthor] = useState({});
  const [authorId, setAuthorID] = useState(0);
  const [genreId, setGenreId] = useState(0);
  const [genre, setGenre] = useState({});

  const [genreList, setGenreList] = useState([]);
  const [artistList, setArtistList] = useState([]);

  const history = useHistory();

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleDuration = (event) => {
    setDuration(event.target.value);
  };

  const handleImage = (event) => {
    setImage(event.target.value);
  };

  const handleRating = (event) => {
    let d = parseFloat(event.target.value);
    setRating(d);
  };

  const handleAuthorId = (event) => {
    setAuthorID(event.target.value);
    GetAuthorById(event.target.value);
  };

  const handleGenreId = (event) => {
    setGenreId(event.target.value);
    GetGenreById(event.target.value);
  };

  useEffect(() => {
    GetSongById();
  }, [song_id]);

  async function setData(data) {
    setName(data.name);
    setDuration(data.duration);
    setImage(data.image);
    setRating(data.rating);
    setAuthorID(data.artist.id);
    setAuthor(data.artist);
    setGenreId(data.genre.id);
    setGenre(data.genre);
  }

  async function GetSongById() {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch("http://localhost:8000/api/song/" + song_id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    let data = await response.json();
    setData(data);
  }

  async function GetAuthorById(id) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch("http://localhost:8000/api/artist/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    let data = await response.json();
    setAuthor(data);
  }

  async function GetGenreById(id) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch("http://localhost:8000/api/genre/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    let data = await response.json();
    setGenre(data);
  }

  useEffect(() => {
    GetGenres();
    GetArtists();
  }, []);

  async function GetGenres() {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch("http://localhost:8000/api/genre", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    if (response.status === 200) {
      let genres = await response.json();
      let list = genres.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      list = [{ id: 0, name: "Select" }].concat(list);
      setGenreList(list);
    }
  }

  async function GetArtists() {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch("http://localhost:8000/api/artist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    if (response.status === 200) {
      let artists = await response.json();
      let list = artists.map((item) => ({
        id: item.id,
        username: item.username,
      }));
      list = [{ id: 0, username: "Select" }].concat(list);
      setArtistList(list);
    }
  }

  async function EditSong(song) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    const response = await fetch("http://localhost:8000/api/song", {
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
      body: JSON.stringify(song),
    });

    let messData = await response.json();
    setID(messData.id);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let date = new Date().toLocaleString().replace(/(.*)\D\d+/, "$1");
    const data = {
      id: song_id,
      name: name,
      duration: duration,
      image: image,
      rating: rating,
      genre: genre,
      artist: author,
      date: date,
    };
    console.log(data);
    EditSong(data);
    history.push("/admin/managetop");
  };

  return (
    <div className={classes.root}>
      <div className="row">
        <div className="col s6 offset-s3">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              multiline
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={name}
              onChange={handleName}
            />
            <TextField
              label="Duration"
              style={{ margin: 8 }}
              multiline
              fullWidth
              margin="normal"
              value={duration}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleDuration}
            />
            <TextField
              label="Image"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              multiline
              value={image}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleImage}
              variant="outlined"
            />
            <TextField
              label="Rating"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              value={rating}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleRating}
              variant="outlined"
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Genre
              </InputLabel>
              <MuiSelect
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={handleGenreId}
                label="Age"
                value={genreId}
              >
                {genreList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </MuiSelect>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Artist
              </InputLabel>
              <MuiSelect
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={handleAuthorId}
                label="Age"
                value={authorId}
              >
                {artistList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.username}
                  </MenuItem>
                ))}
              </MuiSelect>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
            >
              EDIT
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

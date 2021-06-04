import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useParams, useHistory } from "react-router-dom";
import { useStyles } from "./Styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Title from "./Title";

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

import TextField from "@material-ui/core/TextField";

import { useCookies } from "react-cookie";
import { Editor } from "@tinymce/tinymce-react";

export function Articles({ id, setID }) {
  const [articleList, setAticleList] = useState([]);

  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);
  const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;

  const [article, setArticleToDel] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openInPopup = (obj) => {
    setArticleToDel(obj);
    handleClickOpen();
  };

  async function LoadArticles() {
    let response = await fetch("http://localhost:8000/api/article", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    if (response.status === 200) {
      let articles = await response.json();
      setAticleList(articles);
    }
  }

  async function DeleteArticle(obj) {
    console.log(obj);
    const response = await fetch("http://localhost:8000/api/article/", {
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
    console.log(delData);
    setID(delData.id);
    console.log(delData.id);
    handleClose();
  }

  const columns = [
    { field: "id", headerName: "ID", width: 100, editable: true },
    { field: "title", headerName: "Title", width: 180, editable: true },
    {
      field: "shortDescription",
      headerName: "Short Description",
      width: 300,
      editable: true,
    },
    { field: "image", headerName: "Image", width: 100 },
    { field: "date", headerName: "Date", width: 150 },
    {
      field: "users",
      headerName: "Written by",
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
              {thisRow.users.email}
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
            <Button
              href={`/admin/editArticle/${thisRow["id"]}`}
              color="primary"
            >
              EDIT
            </Button>
            <Button
              color="secondary"
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
    LoadArticles();
  }, [id]);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Button>
        <Link variant="contained" color="primary" to="/admin/addarticles">
          ADD NEW ARTICLES
        </Link>
      </Button>
      <DataGrid
        rows={articleList}
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
            Are you sure to delete this Release "{article["title"]}"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              DeleteArticle(article);
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

export function AddArticle({ id, setID }) {
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);

  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [shortDes, setShort] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [banner, setBaner] = useState("");
  const [usersList, setUserList] = useState([]);
  const [user, setUser] = useState(0);

  const history = useHistory();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleShort = (event) => {
    setShort(event.target.value);
  };

  const handleDescription = (event) => {
    setText(event.target.value);
  };

  const handleImage = (event) => {
    setImage(event.target.value);
  };

  const handleBanner = (event) => {
    setBaner(event.target.value);
  };

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let date = new Date().toLocaleString().replace(/(.*)\D\d+/, "$1");
    const data = {
      title: title,
      shortDescription: shortDes,
      text: text,
      image: image,
      banner_image: banner,
      users: user,
      date: date,
    };
    console.log(data);
    addArticle(data);
    history.push("/admin/managearcticles");
  };

  useEffect(() => {
    GetUsers();
  }, []);

  async function GetUsers() {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch("http://localhost:8000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    if (response.status === 200) {
      let users = await response.json();
      let list = users.map((item) => ({
        id: item.id,
        email: item.email,
      }));
      list = [{ id: 0, email: "Select" }].concat(list);
      setUserList(list);
    }
  }

  async function addArticle(article) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    const response = await fetch("http://localhost:8000/api/article", {
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
      body: JSON.stringify(article),
    });

    let messData = await response.json();
    setID(messData.id);
  }

  return (
    <div className={classes.root}>
      <div className="row">
        <div className="col s12 ">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              multiline
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleTitle}
            />
            <TextField
              label="Short Description"
              style={{ margin: 8 }}
              multiline
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleShort}
            />
            <p>Description</p>
            <Editor
              onEditorChange={(text) => setText(text)}
              apiKey="3rt1bcc5xga1spkaf6638f4z85rgw9q6zvhe8cy518a6lo7q"
              plugins="wordcount"
              init={{
                height: 550,
              }}
              //outputFormat="text"
            />
            {/* <TextField
              label="Text"
              style={{ margin: 8 }}
              fullWidth
              multiline
              rows={10}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleDescription}
            /> */}
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
              label="Banner Image"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              multiline
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleBanner}
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Author
              </InputLabel>
              <MuiSelect
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={user}
                onChange={handleChange}
                label="Age"
              >
                {usersList.map((item) => (
                  <MenuItem key={item.id} value={item}>
                    {item.email}
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

export function EditArticle({ id, setID }) {
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);

  const classes = useStyles();

  let { article_id } = useParams();

  const [title, setTitle] = useState("");
  const [shortDes, setShort] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [banner, setBaner] = useState("");
  const [usersList, setUserList] = useState([]);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(0);

  const history = useHistory();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleShort = (event) => {
    setShort(event.target.value);
  };

  const handleDescription = (event) => {
    setText(event.target.value);
  };

  const handleImage = (event) => {
    setImage(event.target.value);
  };

  const handleBanner = (event) => {
    setBaner(event.target.value);
  };

  const handleUserId = (event) => {
    setUserId(event.target.value);
    GetUserById(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let date = new Date().toLocaleString().replace(/(.*)\D\d+/, "$1");
    const data = {
      id: article_id,
      title: title,
      shortDescription: shortDes,
      text: text,
      image: image,
      banner_image: banner,
      users: user,
      date: date,
    };
    console.log(data);
    EditArticle(data);
    history.push("/admin/managearcticles");
  };

  useEffect(() => {
    GetArticleById();
  }, [article_id]);

  async function setData(data) {
    setTitle(data.title);
    setShort(data.shortDescription);
    setImage(data.image);
    setText(data.text);
    setBaner(data.banner_image);
    setUserId(data.users.id);
    //setAuthor(data.users);
    GetUserById(data.users.id);
  }

  async function GetArticleById() {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch(
      "http://localhost:8000/api/article/" + article_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      }
    );
    let data = await response.json();
    setData(data);
  }

  async function GetUserById(id) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch("http://localhost:8000/api/users/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    let data = await response.json();
    setUser(data);
  }

  useEffect(() => {
    GetUsers();
  }, []);

  async function GetUsers() {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch("http://localhost:8000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    if (response.status === 200) {
      let users = await response.json();
      let list = users.map((item) => ({
        id: item.id,
        email: item.email,
      }));
      list = [{ id: 0, email: "Select" }].concat(list);
      setUserList(list);
    }
  }

  async function EditArticle(article) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    const response = await fetch("http://localhost:8000/api/article", {
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
      body: JSON.stringify(article),
    });

    let messData = await response.json();
    setID(messData.id);
  }

  return (
    <div className={classes.root}>
      <div className="row">
        <div className="col s12 ">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              multiline
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleTitle}
              value={title}
            />
            <TextField
              label="Short Description"
              style={{ margin: 8 }}
              multiline
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleShort}
              value={shortDes}
            />
            <Editor
              onEditorChange={(text) => setText(text)}
              value={text}
              apiKey="3rt1bcc5xga1spkaf6638f4z85rgw9q6zvhe8cy518a6lo7q"
              plugins="wordcount"
              init={{
                height: 550,
              }}
              //outputFormat="text"
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
              value={image}
            />
            <TextField
              label="Banner Image"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              multiline
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleBanner}
              value={banner}
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Author
              </InputLabel>
              <MuiSelect
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={userId}
                onChange={handleUserId}
                label="Age"
              >
                {usersList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.email}
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

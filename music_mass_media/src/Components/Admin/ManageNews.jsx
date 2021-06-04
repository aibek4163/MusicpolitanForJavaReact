import React, { useState, useEffect } from "react";
import { Link, Route, Switch, useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useCookies } from "react-cookie";
import { Editor } from "@tinymce/tinymce-react";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [createData(0, "1", "Elvis Presley", "test", "date", "img")];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  button: {
    float: "right",
    marginLeft: "10px",
  },
}));

export function News({ newsID, setNewsID }) {
  const [listNews, setNews] = useState([]);
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);
  const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;

  const [title, setTitle] = useState("");
  const [shortDes, setShort] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [banner, setBaner] = useState("");

  const [item, setItem] = useState({});

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function loadNews() {
    let response = await fetch("http://localhost:8000/api/news", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    if (response.status === 200) {
      let listNews = await response.json();
      console.log(listNews);
      setNews(listNews);
    }
  }

  useEffect(() => {
    loadNews();
  }, [newsID]);

  async function DeleteNews(obj) {
    const response = await fetch("http://localhost:8000/api/news/", {
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
    setNewsID(delData.id);
    handleClose();
  }

  const classes = useStyles();

  const openInPopup = (obj) => {
    console.log(obj);
    setItem(obj);
    handleClickOpen();
  };

  return (
    <React.Fragment>
      <Button>
        <Link variant="contained" color="primary" to="/admin/addnews">
          ADD FRESH NEWS
        </Link>
      </Button>
      <Title>News</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Short Description</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listNews.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.shortDescription}</TableCell>
              <TableCell>
                <img width="10%" src={row.image} alt="" />
              </TableCell>
              <TableCell width="10%">{row.date}</TableCell>
              <TableCell align="right">
                {/* <Link to={`/admin/editNews/${row.id}`}>EDIT</Link> */}
                <Button href={`/admin/editNews/${row.id}`} color="primary">
                  EDIT
                </Button>
                <Button
                  href="#text-buttons"
                  color="primary"
                  onClick={() => {
                    openInPopup(row);
                  }}
                >
                  DELETE
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
            Are you sure to delete this News <bold>"{item.title}"</bold>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              DeleteNews(item);
            }}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}

export function EditNews({ newsID, setNewsID }) {
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);
  const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;

  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [shortDes, setShort] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [banner, setBaner] = useState("");

  let { news_id } = useParams();
  const history = useHistory();

  console.log(news_id);

  async function setData(data) {
    setTitle(data.title);
    setShort(data.shortDescription);
    setDescription(data.description);
    setImage(data.image);
    setBaner(data.banner_image);
  }

  async function GetNewsById() {
    let response = await fetch("http://localhost:8000/api/news/" + news_id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    let data = await response.json();
    console.log(data);
    setData(data);
  }

  useEffect(() => {
    GetNewsById();
  }, []);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleShort = (event) => {
    setShort(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleImage = (event) => {
    setImage(event.target.value);
  };

  const handleBanner = (event) => {
    setBaner(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let date = new Date().toLocaleString().replace(/(.*)\D\d+/, "$1");
    const data = {
      id: news_id,
      title: title,
      shortDescription: shortDes,
      description: description,
      image: image,
      banner_image: banner,
      date: date,
    };
    console.log(data);
    UpdateNews(data);
    history.push("/admin/managenews");
  };

  async function ToDeleteNews() {
    let date = new Date().toLocaleString().replace(/(.*)\D\d+/, "$1");
    const data = {
      id: news_id,
      title: title,
      shortDescription: shortDes,
      description: description,
      image: image,
      banner_image: banner,
      date: date,
    };
    DeleteNews(data);
    history.push("/admin/managenews");
  }

  async function DeleteNews(data) {
    const response = await fetch("http://localhost:8000/api/news", {
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
      body: JSON.stringify(data),
    });
    let delData = await response.json();
    setNewsID(delData.id);
  }

  async function UpdateNews(news) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    const response = await fetch("http://localhost:8000/api/news", {
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
      body: JSON.stringify(news),
    });

    let messData = await response.json();
    console.log(messData);
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
              multiline
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleTitle}
              value={title}
            />
            <TextField
              label="Short Description"
              multiline
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={shortDes}
              onChange={handleShort}
            />
            <p>Description</p>
            <Editor
              onEditorChange={(text) => setDescription(text)}
              apiKey="3rt1bcc5xga1spkaf6638f4z85rgw9q6zvhe8cy518a6lo7q"
              plugins="wordcount"
              value={description}
              init={{
                height: 550,
              }}
              //outputFormat="text"
            />
            {/* <TextField
              label="Description"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              multiline
              rows={10}
              value={description}
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

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.button}
            >
              EDIT
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className={classes.button}
              onClick={ToDeleteNews}
            >
              - DELETE
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

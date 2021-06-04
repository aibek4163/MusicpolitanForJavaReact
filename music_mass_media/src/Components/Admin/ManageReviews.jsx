import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

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
import { Link, useParams, useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";

import { useCookies } from "react-cookie";

import { Editor } from "@tinymce/tinymce-react";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  button: {
    float: "right",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
}));

export function Review({ id, setID }) {
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);
  const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;

  const [reviewList, setReviewList] = useState([]);

  const [review, setReviewToDel] = useState({});
  const [open, setOpen] = useState(false);

  setID(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openInPopup = (obj) => {
    setReviewToDel(obj);
    handleClickOpen();
  };

  async function LoadReview() {
    let response = await fetch("http://localhost:8000/api/review", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    if (response.status === 200) {
      let reviews = await response.json();
      setReviewList(reviews);
    }
  }

  async function DeleteReview(obj) {
    console.log(obj);
    const response = await fetch("http://localhost:8000/api/review/", {
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
    { field: "title", headerName: "Title", width: 100, editable: true },
    {
      field: "shortDescription",
      headerName: "Short Description",
      width: 200,
      editable: true,
    },
    { field: "mark", headerName: "Mark", width: 85 },
    { field: "date", headerName: "Date", width: 150 },
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
      field: "users",
      headerName: "Author",
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
            <Button href={`/admin/editReview/${thisRow["id"]}`} color="primary">
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
    LoadReview();
  }, [id]);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Button>
        <Link variant="contained" color="primary" to="/admin/addreviews">
          ADD NEW REVIEW
        </Link>
      </Button>
      <DataGrid
        rows={reviewList}
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
            Are you sure to delete this Release "{review["title"]}"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              DeleteReview(review);
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

export function AddReviews({ id, setID }) {
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);

  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [shortDes, setShort] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [banner, setBaner] = useState("");
  const [author, setAuthor] = useState({});
  const [genre, setGenre] = useState({});
  const [mark, setMark] = useState(0);

  const [authorList, setAuthorList] = useState([]);
  const [genreList, setGenreList] = useState([]);

  const [tiny, setTiny] = useState("");

  const history = useHistory();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleShort = (event) => {
    setShort(event.target.value);
  };

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleImage = (event) => {
    setImage(event.target.value);
  };

  const handleBanner = (event) => {
    setBaner(event.target.value);
  };

  const handleAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handleGenre = (event) => {
    setGenre(event.target.value);
  };

  const handleChangeMark = (event) => {
    let d = parseFloat(event.target.value);
    setMark(d);
  };

  // const handleChangeTiny = (event) => {
  //   setTiny(event.target.value);
  //   //console.log(event.target.value);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    let date = new Date().toLocaleString().replace(/(.*)\D\d+/, "$1");
    const data = {
      title: title,
      shortDescription: shortDes,
      description: text,
      image: image,
      banner_image: banner,
      mark: mark,
      users: author,
      genre: genre,
      date: date,
    };
    console.log(data);
    AddReview(data);
    history.push("/admin/managereviews");
  };

  useEffect(() => {
    GetUsers();
    GetGenres();
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
      setAuthorList(list);
    }
  }

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

  async function AddReview(review) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    const response = await fetch("http://localhost:8000/api/review", {
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
      body: JSON.stringify(review),
    });

    let messData = await response.json();
    console.log(messData);
    setID(messData.id);
  }
  console.log(tiny);

  return (
    <div className={classes.root}>
      <div className="row">
        <div className="col s6 offset-s3">
          <form onSubmit={handleSubmit}>
            <pre>{tiny}</pre>
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
              onChange={handleText}
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
                onChange={handleAuthor}
                label="Age"
              >
                {authorList.map((item) => (
                  <MenuItem key={item.id} value={item}>
                    {item.email}
                  </MenuItem>
                ))}
              </MuiSelect>
            </FormControl>
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
            <TextField
              className={classes.formControl}
              label="Mark"
              multiline
              value={mark.numberformat}
              onChange={handleChangeMark}
              name="numberformat"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
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

export function EditReview({ id, setID }) {
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);

  let { review_id } = useParams();

  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [shortDes, setShort] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [banner, setBaner] = useState("");
  const [author, setAuthor] = useState({});
  const [authorId, setAuthorId] = useState(0);
  const [genre, setGenre] = useState({});
  const [genreId, setGenreId] = useState(0);
  const [mark, setMark] = useState(0);

  const [authorList, setAuthorList] = useState([]);
  const [genreList, setGenreList] = useState([]);

  const history = useHistory();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleShort = (event) => {
    setShort(event.target.value);
  };

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleImage = (event) => {
    setImage(event.target.value);
  };

  const handleBanner = (event) => {
    setBaner(event.target.value);
  };

  const handleAuthorId = (event) => {
    setAuthorId(event.target.value);
    GetUserById(event.target.value);
  };

  const handleGenreId = (event) => {
    setGenreId(event.target.value);
    GetGenreById(event.target.value);
  };

  const handleChangeMark = (event) => {
    let d = parseFloat(event.target.value);
    setMark(d);
  };

  useEffect(() => {
    GetReviewById();
  }, [review_id]);

  async function setData(data) {
    setTitle(data.title);
    setShort(data.shortDescription);
    setImage(data.image);
    setText(data.description);
    setBaner(data.banner_image);
    setMark(data.mark);
    setAuthorId(data.users.id);
    //setAuthor(data.users);
    GetUserById(data.users.id);
    setGenreId(data.genre.id);
    setGenre(data.genre);
  }

  async function GetReviewById() {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch(
      "http://localhost:8000/api/review/" + review_id,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    let date = new Date().toLocaleString().replace(/(.*)\D\d+/, "$1");
    const data = {
      id: review_id,
      title: title,
      shortDescription: shortDes,
      description: text,
      image: image,
      banner_image: banner,
      mark: mark,
      users: author,
      genre: genre,
      date: date,
    };
    console.log(data);
    EditReview(data);
    history.push("/admin/managereviews");
  };

  useEffect(() => {
    GetUsers();
    GetGenres();
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
      setAuthorList(list);
    }
  }

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

  async function EditReview(review) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    const response = await fetch("http://localhost:8000/api/review", {
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
      body: JSON.stringify(review),
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
              value={text}
              onChange={handleText}
            /> */}
            <Editor
              onEditorChange={(text) => setText(text)}
              apiKey="3rt1bcc5xga1spkaf6638f4z85rgw9q6zvhe8cy518a6lo7q"
              // plugins="wordcount"
              value={text}
              init={{
                height: 500,
                plugins: [
                  "advlist autolink lists link image",
                  "charmap print preview anchor help",
                  "searchreplace visualblocks code",
                  "insertdatetime media table paste wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help",
              }}
              //outputFormat="text"
            />
            <p value={text}></p>
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
              label="Banner Image"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              multiline
              value={banner}
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
                onChange={handleAuthorId}
                label="Age"
                value={authorId}
              >
                {authorList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.email}
                  </MenuItem>
                ))}
              </MuiSelect>
            </FormControl>
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
            <TextField
              className={classes.formControl}
              label="Mark"
              multiline
              value={mark}
              onChange={handleChangeMark}
              name="numberformat"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />
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

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      multiline
      thousandSeparator
      isNumericString
      prefix="# "
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

import React, { useState, useEffect, useContext } from "react";
import { useStyles } from "./Styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import Title from "./Title";
import TextField from "@material-ui/core/TextField";
import { Link, Route, Switch, useParams, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@material-ui/core";
import { AuthContext } from "../../App";

function preventDefault(event) {
  event.preventDefault();
}

export function Comments() {
  const { cookieJWT, removeCookieJWT } = useContext(AuthContext);

  const classes = useStyles();
  const [list, setList] = useState([]);

  async function GetComments() {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch("http://localhost:8000/api/comment", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    if (response.status === 200) {
      let listComment = await response.json();
      console.log(listComment);
      setList(listComment);
    }
  }

  const [item, setItem] = useState({});
  const [open, setOpen] = useState(false);
  const [commentID, setCommentID] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    GetComments();
  }, [commentID]);

  const openInPopup = (obj) => {
    console.log(obj);
    setItem(obj);
    handleClickOpen();
  };

  async function DeleteComments(obj) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    const response = await fetch("http://localhost:8000/api/comment", {
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
    setCommentID(delData.id);
    handleClose();
  }

  return (
    <React.Fragment>
      <Title>Comments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Comment Text</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Author</TableCell>
            <TableCell align="right">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.comment}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.author.email}</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="delete"
                  value={row.id}
                  //onClick={deleteComment}
                  onClick={() => {
                    openInPopup(row);
                  }}
                >
                  <DeleteIcon fontSize="small" color="secondary" />
                </IconButton>
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
            Are you sure to delete this Comment <bold>"{item.comment}"</bold>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              DeleteComments(item);
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

export function AddAlbum() {
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);

  const classes = useStyles();

  const [name, setTitle] = useState("");
  const [image, setShort] = useState("");
  const [usersList, setUsers] = useState([]);
  const [userID, setUserID] = useState(0);

  const history = useHistory();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleShort = (event) => {
    setShort(event.target.value);
  };

  const handleChange = (event) => {
    setUserID(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let date = new Date().toLocaleString().replace(/(.*)\D\d+/, "$1");
    const data = {
      name: name,
      image: image,
      date: date,
    };
    console.log(data);
    addArticles(data);
    history.push("/admin/managenews");
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
      setUsers(list);
    }
  }

  async function addArticles(artiles) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    const response = await fetch("http://localhost:8000/api/news", {
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
      body: JSON.stringify(artiles),
    });

    let messData = await response.json();
    //setNewsID(messData.id);
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
              onChange={handleTitle}
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
              onChange={handleShort}
            />
            <TextField
              label="Image"
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

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Songs
              </InputLabel>
              <MuiSelect
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={userID}
                onChange={handleChange}
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
              + ADD
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

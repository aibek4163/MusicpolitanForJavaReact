import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Title from "./Title";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import TextField from "@material-ui/core/TextField";

import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@material-ui/core";

import { DataGrid, GridToolbar } from "@material-ui/data-grid";

import { useCookies } from "react-cookie";

import { Link, useHistory, useParams } from "react-router-dom";
import { useStyles } from "./Styles";

function preventDefault(event) {
  event.preventDefault();
}

export function Releases({ id, setID }) {
  const classes = useStyles();

  const [releaseList, setRelease] = useState([]);
  const [release, setReleaseToDel] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openInPopup = (obj) => {
    console.log(obj);
    setReleaseToDel(obj);
    handleClickOpen();
  };

  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);
  const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;

  async function loadReleases() {
    let response = await fetch("http://localhost:8000/api/release", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    if (response.status === 200) {
      let listNews = await response.json();
      setRelease(listNews);
    }
  }

  async function DeleteRelease(obj) {
    const response = await fetch("http://localhost:8000/api/release/", {
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
    { field: "title", headerName: "Title", width: 300, editable: true },
    {
      field: "shortDescription",
      headerName: "Short Description",
      width: 300,
      editable: true,
    },
    // { field: "description", headerName: "Description", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    {
      field: "options",
      headerName: "Options",
      width: 200,

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
              href={`/admin/editRelease/${thisRow["id"]}`}
              color="primary"
            >
              EDIT
            </Button>
            <Button
              href="#text-buttons"
              color="primary"
              onClick={() => {
                openInPopup(thisRow);
              }}
            >
              DELETE
            </Button>
          </>
        );
        //return alert(JSON.stringify(thisRow, null, 4));
      },
    },
  ];

  useEffect(() => {
    loadReleases();
  }, [id]);

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Button>
        <Link variant="contained" color="primary" to="/admin/addreleases">
          ADD NEW RELEASES
        </Link>
      </Button>
      <DataGrid
        rows={releaseList}
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
            Are you sure to delete this Release "{release["title"]}"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              DeleteRelease(release);
            }}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    // <React.Fragment>
    //   <Button>
    //     <Link variant="contained" color="primary" to="/admin/addreleases">
    //       ADD NEW RELEASES
    //     </Link>
    //   </Button>
    //   <Title>RELEASES</Title>
    //   <Table size="small">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>ID</TableCell>
    //         <TableCell>Title</TableCell>
    //         <TableCell>Short Description</TableCell>
    //         <TableCell>Date</TableCell>
    //         <TableCell align="right">Image</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {list.map((row) => (
    //         <TableRow key={row.id}>
    //           <TableCell>{row.date}</TableCell>
    //           <TableCell>{row.name}</TableCell>
    //           <TableCell>{row.shipTo}</TableCell>
    //           <TableCell>{row.paymentMethod}</TableCell>
    //           <TableCell align="right">{row.amount}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    //   <div className={classes.seeMore}>
    //     <Link color="primary" href="#" onClick={preventDefault}>
    //       See more orders
    //     </Link>
    //   </div>
    // </React.Fragment>
  );
}

export function AddRelease({ id, setID }) {
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);

  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [shortDes, setShort] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [banner, setBaner] = useState("");
  const [usersList, setUsers] = useState([]);
  const [userID, setUserID] = useState({});

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
    setUserID(event.target.value);
    console.log(event.target.value);
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
      date: date,
      artist: userID,
    };
    console.log(data);
    addRelease(data);
    history.push("/admin/managereleases");
  };

  useEffect(() => {
    GetUsers();
  }, []);

  async function GetUsers() {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch("http://localhost:8000/api/artist", {
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
        username: item.username,
        photo: item.photo,
      }));
      list = [{ id: 0, username: "Select" }].concat(list);
      setUsers(list);
    }
  }

  async function addRelease(artiles) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    const response = await fetch("http://localhost:8000/api/release", {
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
    console.log(messData);
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
            <TextField
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
                Artist
              </InputLabel>
              <MuiSelect
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={userID}
                onChange={handleChange}
                label="Age"
              >
                {usersList.map((item) => (
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

export function EditRelease() {
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);

  const classes = useStyles();

  let { release_id } = useParams();

  const [title, setTitle] = useState("");
  const [shortDes, setShort] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [banner, setBaner] = useState("");
  const [usersList, setUsers] = useState([]);
  const [userID, setUserID] = useState({});
  const [artistID, setArtist] = useState(0);
  const [artistObj, setArtistObj] = useState({});

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

  const handleArtist = (event) => {
    setUserID(event.target.value);
    setArtist(event.target.value);
    GetArtistById(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    GetReleaseById();
  }, [release_id]);

  async function setData(data) {
    setTitle(data.title);
    setShort(data.shortDescription);
    setText(data.text);
    setImage(data.image);
    setBaner(data.banner_image);
    setArtist(data.artist.id);
    setArtistObj(data.artist);
  }

  async function GetReleaseById() {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch(
      "http://localhost:8000/api/release/" + release_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      }
    );
    let data = await response.json();
    console.log(data);
    setData(data);
  }

  async function GetArtistById(id) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch("http://localhost:8000/api/artist/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });
    let data = await response.json();
    console.log(data);
    setArtistObj(data);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(artistID);
    //GetArtistById(artistID);
    console.log(artistObj);
    let date = new Date().toLocaleString().replace(/(.*)\D\d+/, "$1");
    const data = {
      id: release_id,
      title: title,
      shortDescription: shortDes,
      text: text,
      image: image,
      banner_image: banner,
      date: date,
      artist: artistObj,
    };
    console.log(data);
    UpdateRelease(data);
    history.push("/admin/managereleases");
  };

  useEffect(() => {
    GetUsers();
  }, []);

  async function GetUsers() {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch("http://localhost:8000/api/artist", {
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
        username: item.username,
        photo: item.photo,
      }));
      //list = [{ id: 0, username: "Select" }].concat(list);
      setUsers(list);
    }
  }

  async function UpdateRelease(release) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    const response = await fetch("http://localhost:8000/api/release", {
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
      body: JSON.stringify(release),
    });

    let messData = await response.json();
    console.log(messData);
    //setNewsID(messData.id);
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
              value={title}
              variant="outlined"
              onChange={handleTitle}
            />
            <TextField
              value={shortDes}
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
            <TextField
              label="Text"
              style={{ margin: 8 }}
              fullWidth
              multiline
              rows={10}
              margin="normal"
              value={text}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleDescription}
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
              value={banner}
              onChange={handleBanner}
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Artist
              </InputLabel>
              <MuiSelect
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={handleArtist}
                label="Artist"
                value={artistID}
                defaultValue={artistID}
              >
                {usersList.map((item) => (
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

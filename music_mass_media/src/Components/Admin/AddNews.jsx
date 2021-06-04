import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useCookies } from "react-cookie";
import { useHistory } from "react-router";
import { Editor } from "@tinymce/tinymce-react";

const useStyles = makeStyles((theme) => ({
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
  },
}));

export function AddNews({ newsID, setNewsID }) {
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(["jwt"]);

  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [shortDes, setShort] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [banner, setBaner] = useState("");

  const history = useHistory();

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
      title: title,
      shortDescription: shortDes,
      description: description,
      image: image,
      banner_image: banner,
      date: date,
    };
    console.log(data);
    addNews(data);
    history.push("/admin/managenews");
  };

  async function addNews(news) {
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
      body: JSON.stringify(news),
    });

    let messData = await response.json();
    setNewsID(messData.id);
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
              InputLabelProps={{
                shrink: true,
              }}
              multiline
              variant="outlined"
              onChange={handleTitle}
            />
            <TextField
              label="Short Description"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              multiline
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleShort}
            />
            <p>Description</p>
            <Editor
              onEditorChange={(text) => setDescription(text)}
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
            />
            <TextField
              label="Banner Image"
              style={{ margin: 8 }}
              fullWidth
              multiline
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={handleBanner}
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

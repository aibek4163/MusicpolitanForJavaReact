import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useStyles } from "./Admin/Styles";
import {
  TextField,
  Button,
  Link,
  Grid,
  Typography,
  Paper,
  Card,
  CardContent,
  IconButton,
  CardMedia,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { useParams } from "react-router";
import { Editor } from "@tinymce/tinymce-react";
import { AuthContext } from "../App";

NewsDetails.propTypes = {
  post: PropTypes.object,
};

export function NewsDetails(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { post } = props;

  let { news_id } = useParams();

  const [news, setNews] = useState({});
  const [title, setTitle] = useState("");
  const [shortDes, setShort] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [banner, setBaner] = useState("");
  const [date, setDate] = useState("");

  const [commentID, setCommentID] = useState(0);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState({});
  const [commentList, setComments] = useState([]);
  const [commentDelID, setCommentDelID] = useState(0);
  const [commentEditID, setCommentEditID] = useState(0);
  const [id, setID] = useState(0);

  const { cookieJWT, removeCookieJWT } = useContext(AuthContext);

  const handleComment = (event) => {
    setComment(event.target.value);
  };

  const handleEdit = (event) => {
    setEditedComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let date = new Date().toLocaleString().replace(/(.*)\D\d+/, "$1");
    const data = {
      comment: comment,
      date: date,
      author: author,
      news: news,
    };
    AddComment(data);
  };

  async function getUser() {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;

    const response = await fetch("http://localhost:8000/api/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    });

    if (response.status === 200) {
      let res = await response.json();
      console.log(res);
      setAuthor(res);
    }
  }

  useEffect(() => {
    if (cookieJWT["jwt"] !== undefined) {
      getUser();
    }
  }, []);

  async function setData(data) {
    setNews(data);
    setTitle(data.title);
    setShort(data.shortDescription);
    setDescription(data.description);
    setImage(data.image);
    setBaner(data.banner_image);
    setDate(data.date);
  }

  async function GetNewsById() {
    let response = await fetch("http://localhost:8000/api/news/" + news_id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    console.log(data);
    setData(data);
  }

  async function AddComment(comment) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    const response = await fetch("http://localhost:8000/api/comment", {
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
      body: JSON.stringify(comment),
    });

    let messData = await response.json();
    setCommentID(messData.id);
    setComment("");
  }

  async function GetComments() {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    let response = await fetch(
      "http://localhost:8000/api/news_comment/" + news_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      }
    );
    if (response.status === 200) {
      let listComment = await response.json();
      console.log(listComment);
      setComments(listComment);
    }
  }

  useEffect(() => {
    GetNewsById();
    GetComments();
  }, [news_id, commentID, id]);

  const deleteComment = (event) => {
    console.log(event.currentTarget.value);
    setCommentDelID(event.currentTarget.value);
  };

  const [item, setItem] = useState({});
  const [editComment, setEditComment] = useState({});

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen2 = () => {
    setOpenEdit(true);
  };

  const handleClose2 = () => {
    setOpenEdit(false);
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

  async function EditComment(comment) {
    const bearer = "Bearer " + cookieJWT["jwt"].jwtToken;
    const response = await fetch("http://localhost:8000/api/comment", {
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
      body: JSON.stringify(comment),
    });

    let messData = await response.json();
    setID(messData.id);
    handleClose2();
  }

  const [editedComment, setEditedComment] = useState("");

  const openInPopup = (obj) => {
    console.log(obj);
    setItem(obj);
    handleClickOpen();
  };

  const openInPopup2 = (obj) => {
    console.log(obj);
    setEditComment(obj);
    setCommentEditID(obj.id);
    setEditedComment(obj.comment);
    handleClickOpen2();
  };

  const handleEditComment = (event) => {
    event.preventDefault();
    let date = new Date().toLocaleString().replace(/(.*)\D\d+/, "$1");
    const data = {
      id: commentEditID,
      comment: editedComment,
      date: date,
      author: author,
      news: news,
    };
    EditComment(data);
  };

  return (
    <div className="details_wrapper">
      <Paper
        className={classes.mainFeaturedPost}
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: "none" }} src={banner} alt="News" />}
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={11}>
            <div className={classes.mainFeaturedPostContent}>
              <div className={classes.top}>
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  News
                </Typography>
                {date}
              </div>

              <Typography variant="h5" color="inherit" align="center" paragraph>
                {title}
              </Typography>
              <Link variant="subtitle1" href="#">
                Link
              </Link>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <div className="main_wrapper">
        <div className={classes.details}>
          <Grid container direction="row" justify="center">
            <Grid item md={6}>
              <h5>
                {" "}
                <bold>{shortDes}</bold>
              </h5>
              <Editor
                onEditorChange={(text) => setDescription(text)}
                apiKey="3rt1bcc5xga1spkaf6638f4z85rgw9q6zvhe8cy518a6lo7q"
                plugins="wordcount"
                value={description}
                init={{
                  height: 550,
                }}
                inline
                disabled
                //outputFormat="text"
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="main_wrapper">
        <div className={classes.details}>
          <Grid container direction="row" justify="center">
            <Grid item md={6}>
              <h4>Comments</h4>
              <form onSubmit={handleSubmit}>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  placeholder="Write Comment ..."
                  fullWidth
                  rows={5}
                  variant="outlined"
                  onChange={handleComment}
                />
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  color="primary"
                  className={classes.comment_button}
                >
                  Send
                </Button>
              </form>
              {commentList?.map((row) => (
                <Card className={classes.comment_root}>
                  <CardMedia
                    className={classes.comment_cover}
                    image={row.author.avatar}
                    title={row.author.fullName}
                  />
                  <div className={classes.comment_details}>
                    <CardContent className={classes.comment_content}>
                      <div className={classes.comment_date}>
                        <div className={classes.comment_text}>
                          <Typography component="h6" variant="h7">
                            {row.author.fullName}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {row.comment}
                          </Typography>
                        </div>
                        <p className={classes.comment_date_place}>{row.date}</p>
                      </div>
                    </CardContent>
                    {author.id === row.author.id ? (
                      <div className={classes.comment_controls}>
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
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            openInPopup2(row);
                          }}
                        >
                          <EditIcon fontSize="small" color="primary" />
                        </IconButton>
                      </div>
                    ) : (
                      <div className={classes.comment_without}></div>
                    )}
                  </div>
                </Card>
              ))}
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
                    Are you sure to delete this Comment{" "}
                    <bold>"{item.comment}"</bold>
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
              <Dialog
                open={openEdit}
                onClose={handleClose2}
                aria-labelledby="form-dialog-title"
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle id="form-dialog-title">Edit</DialogTitle>
                <form onSubmit={handleEditComment}>
                  <DialogContent>
                    <DialogContentText>
                      <TextField
                        id="outlined-multiline-static"
                        multiline
                        placeholder="Write Comment ..."
                        fullWidth
                        rows={5}
                        value={editedComment}
                        variant="outlined"
                        onChange={handleEdit}
                      />
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose2} color="primary">
                      Cancel
                    </Button>
                    <Button type="submit" color="secondary">
                      Edit
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export function ReviewDetails(props) {
  const classes = useStyles();
  const { post } = props;

  let { review_id } = useParams();

  const [title, setTitle] = useState("");
  const [shortDes, setShort] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [banner, setBaner] = useState("");
  const [author, setAuthor] = useState({});
  const [genre, setGenre] = useState({});
  const [date, setDate] = useState("");

  async function setData(data) {
    setTitle(data.title);
    setShort(data.shortDescription);
    setDescription(data.description);
    setImage(data.image);
    setBaner(data.banner_image);
    setAuthor(data.users);
    setGenre(data.genre);
    setDate(data.date);
  }

  async function GetNewsById() {
    let response = await fetch(
      "http://localhost:8000/api/review/" + review_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();
    console.log(data);
    setData(data);
  }

  useEffect(() => {
    GetNewsById();
  }, [review_id]);

  return (
    <div className="details_wrapper">
      <Paper
        className={classes.mainFeaturedPostReview}
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: "none" }} alt="News" />}
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={11}>
            <div className={classes.mainFeaturedPostContent}>
              <div className={classes.top}>
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  Review
                </Typography>
                {date}
              </div>
              <Typography variant="h1" color="inherit" align="left" paragraph>
                {title}
              </Typography>
              <h5>
                {" "}
                <bold>{shortDes}</bold>
              </h5>
              <div className={classes.bottom}>
                <p>by {author.fullName}</p>
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <div className="main_wrapper">
        <div className={classes.details}>
          <Grid container direction="row" justify="center">
            <Grid item md={6}>
              <Editor
                onEditorChange={(text) => setDescription(text)}
                apiKey="3rt1bcc5xga1spkaf6638f4z85rgw9q6zvhe8cy518a6lo7q"
                plugins="wordcount"
                value={description}
                init={{
                  height: 550,
                }}
                inline
                disabled
                //outputFormat="text"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export function ArticleDetails(props) {
  const classes = useStyles();
  const { post } = props;

  let { article_id } = useParams();

  const [title, setTitle] = useState("");
  const [shortDes, setShort] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [banner, setBaner] = useState("");
  const [author, setAuthor] = useState({});
  const [date, setDate] = useState("");

  async function setData(data) {
    setTitle(data.title);
    setShort(data.shortDescription);
    setDescription(data.text);
    setImage(data.image);
    setBaner(data.banner_image);
    setAuthor(data.users);
    setDate(data.date);
  }

  async function GetNewsById() {
    let response = await fetch(
      "http://localhost:8000/api/article/" + article_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();
    console.log(data);
    setData(data);
  }

  useEffect(() => {
    GetNewsById();
  }, [article_id]);

  return (
    <div className="details_wrapper">
      <Paper
        className={classes.mainFeaturedPost}
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: "none" }} src={banner} alt="News" />}
        <div className={classes.overlayArticle} />
        <Grid container>
          <Grid item md={11}>
            <div className={classes.mainFeaturedPostContent}>
              <div className={classes.top}>
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                >
                  Review
                </Typography>
                <p>by {author.fullName}</p>
                {date}
              </div>
              <Typography variant="h1" color="inherit" align="left" paragraph>
                {title}
              </Typography>
              <h5>
                {" "}
                <bold>{shortDes}</bold>
              </h5>
              <div className={classes.bottom}></div>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <div className="main_wrapper">
        <div className={classes.details}>
          <Grid container direction="row" justify="center">
            <Grid item md={6}>
              <Editor
                onEditorChange={(text) => setDescription(text)}
                apiKey="3rt1bcc5xga1spkaf6638f4z85rgw9q6zvhe8cy518a6lo7q"
                plugins="wordcount"
                value={description}
                init={{
                  height: 550,
                }}
                inline
                disabled
                //outputFormat="text"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

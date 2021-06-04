import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems } from "./ListItem";

import Orders from "./ManageUsers";
import { News, EditNews } from "./ManageNews";
import { AddRelease, EditRelease, Releases } from "./ManageReleases";
import { Top, AddMusic, EditMusic } from "./ManageTop";
import { Review, AddReviews, EditReview } from "./ManageReviews";
import { Articles, AddArticle, EditArticle } from "./ManageArticles";
import { Genres } from "./ManageGenres";
import { Albums, AddAlbum } from "./ManageAlbums";
import { Artists, AddArtist } from "./ManageArtists";
import { Comments } from "./ManageComments";

import { Route, Switch } from "react-router-dom";
import { AddNews } from "./AddNews";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        MusicPolitan
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export function Dashboard() {
  const [id, setID] = useState(0);

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <Link href="/">
            <Typography
              component="h4"
              variant="h6"
              color="secondary"
              noWrap
              className={classes.title}
            >
              Home
            </Typography>
          </Link>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Route path="/admin/users">
                    <Orders />
                  </Route>
                  <Route path="/admin/managenews">
                    <News newsID={id} setNewsID={setID} />
                  </Route>
                  <Route path="/admin/managereleases">
                    <Releases id={id} setID={setID} />
                  </Route>
                  <Route path="/admin/managetop">
                    <Top id={id} setID={setID} />
                  </Route>
                  <Route path="/admin/managereviews">
                    <Review id={id} setID={setID} />
                  </Route>
                  <Route path="/admin/managearcticles">
                    <Articles id={id} setID={setID} />
                  </Route>
                  <Route path="/admin/managegenres">
                    <Genres />
                  </Route>
                  <Route path="/admin/managealbums">
                    <Albums />
                  </Route>
                  <Route path="/admin/manageartists">
                    <Artists id={id} setID={setID} />
                  </Route>
                  <Route path="/admin/managecomments">
                    <Comments />
                  </Route>

                  <Route path="/admin/addnews">
                    <AddNews newsID={id} setNewsID={setID} />
                  </Route>
                  <Route path="/admin/addarticles">
                    <AddArticle id={id} setID={setID} />
                  </Route>
                  <Route path="/admin/addreviews">
                    <AddReviews id={id} setID={setID} />
                  </Route>
                  <Route path="/admin/addmusic">
                    <AddMusic id={id} setID={setID} />
                  </Route>
                  <Route path="/admin/addalbum">
                    <AddAlbum />
                  </Route>
                  <Route path="/admin/addartist">
                    <AddArtist id={id} setID={setID} />
                  </Route>
                  <Route path="/admin/addreleases">
                    <AddRelease id={id} setID={setID} />
                  </Route>

                  <Route path={`/admin/editArticle/:article_id`}>
                    <EditArticle id={id} setID={setID} />
                  </Route>
                  <Route path={`/admin/editNews/:news_id`}>
                    <EditNews newsID={id} setNewsID={setID} />
                  </Route>
                  <Route path={`/admin/editRelease/:release_id`}>
                    <EditRelease id={id} setID={setID} />
                  </Route>
                  <Route path={`/admin/editSong/:song_id`}>
                    <EditMusic id={id} setID={setID} />
                  </Route>
                  <Route path={`/admin/editReview/:review_id`}>
                    <EditReview id={id} setID={setID} />
                  </Route>
                </Paper>
              </Grid>
            </Grid>
          </Switch>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

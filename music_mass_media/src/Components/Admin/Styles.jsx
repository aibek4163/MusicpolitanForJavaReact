import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: 500,
  },
  mainFeaturedPostReview: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: 900,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
    backdropFilter: "blur(1px)",
  },
  overlayArticle: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
    backdropFilter: "blur(9px)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(10),
      paddingRight: 0,
    },
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
  },
  bottom: {
    marginTop: "70vh",
  },
  details: {
    backgroundColor: "white",
  },
  comment_button: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    float: "right",
    marginTop: "10px",
    marginBottom: "20px",
  },
  comment_root: {
    display: "flex",
    marginTop: "20px",
    width: "100%",
  },
  comment_details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  comment_content: {
    flex: "1 0 auto",
  },
  comment_cover: {
    minWidth: 70,
    minHeight: 70,
    maxWidth: 70,
    maxHeight: 70,
    borderRadius: 7,
  },
  comment_controls: {
    display: "flex",
    paddingLeft: theme.spacing(65),
    paddingBottom: theme.spacing(1),
  },
  comment_playIcon: {
    height: 15,
    width: 15,
  },
  comment_date: {
    display: "flex",
    justifyContent: "space-between",
  },
  comment_date_place: {
    marginTop: 0,
  },
  comment_text: {
    paddingLeft: theme.spacing(1),
  },
  comment_without: {
    display: "flex",
    height: 30,
    paddingLeft: theme.spacing(65),
    paddingBottom: theme.spacing(1),
  },
}));

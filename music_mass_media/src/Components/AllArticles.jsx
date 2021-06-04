import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    minHeight: 300,
    marginBottom: "10px",
  },
  content: {
    minHeight: 300,
    maxHeight: 350,
  },
});

export function AllArticles() {
  const classes = useStyles();
  const [articleList, setArticleList] = useState([]);

  async function LoadArticles() {
    let response = await fetch("http://localhost:8000/api/article", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      let listArticle = await response.json();
      console.log(listArticle);
      setArticleList(listArticle);
    }
  }

  useEffect(() => {
    LoadArticles();
  }, []);

  return (
    <div className="main_wrapper">
      <h3>Articles</h3>
      <div
        className="news_wrapper"
        style={{ paddingTop: "15px", paddingBottom: "5px" }}
      >
        <div className="row">
          {articleList?.map((row) => (
            <div class="col m3 s12">
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="250"
                    alt="Contemplative Reptile"
                    image={row.image}
                    title="Contemplative Reptile"
                    style={{ backgroundSize: "cover" }}
                  />
                  <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {row.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {row.shortDescription}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    href={`/detailsArticle/${row.id}`}
                    color="primary"
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import ReactSwipe from "react-swipe";
import { Row } from "react-materialize";
import { useEffect, useState } from "react";

export const Reviews = () => {
  let reactSwipeEl;
  const [reviewList, setReviewList] = useState([]);

  async function LoadReview() {
    let response = await fetch("http://localhost:8000/api/review", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      let reviews = await response.json();
      setReviewList(reviews);
    }
  }

  useEffect(() => {
    LoadReview();
  }, []);

  console.log(reviewList);

  return (
    <div className="main_wrapper">
      <div className="row valign-wrapper">
        <h3 className="col s9" style={{ paddingLeft: "0px" }}>
          Reviews
        </h3>
        <div className="col s3 right-align">
          <button
            className="waves-effect waves-light btn"
            onClick={() => reactSwipeEl.prev()}
          >
            <span class="material-icons" style={{ lineHeight: "" }}>
              chevron_left
            </span>
          </button>
          <button
            style={{ marginLeft: "10px" }}
            className="waves-effect waves-light btn"
            onClick={() => reactSwipeEl.next()}
          >
            <span class="material-icons" style={{ lineHeight: "" }}>
              chevron_right
            </span>
          </button>
        </div>
      </div>
      <div></div>
      <Row style={{ width: "50%" }}>
        <ReactSwipe
          className="carousel"
          swipeOptions={{ continuous: true }}
          ref={(el) => (reactSwipeEl = el)}
        >
          {reviewList?.map((row) => (
            <div>
              <div class="col s12 m6" style={{ paddingLeft: "0px" }}>
                <div class="card horizontal">
                  <div class="card-image">
                    <img src={row.image} alt="" />
                  </div>
                  <div class="card-stacked">
                    <div class="card-content">
                      <p>{row.title}</p>
                      <p>{row.shortDescription}</p>
                      <p>{row.mark}</p>
                      <p> by {row.users.fullName}</p>
                      <div class="card-action">
                        <a href={`/detailsReview/${row.id}`}>Read More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ReactSwipe>
      </Row>
    </div>
  );
};

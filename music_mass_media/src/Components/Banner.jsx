import M from "materialize-css";
import { Carousel } from "react-materialize";
export function Banner(props) {
  return (
    <div className="">
      <Carousel
        carouselId="Carousel-2"
        className="white-text center"
        options={{
          fullWidth: true,
          indicators: true,
        }}
      >
        <div
          className="red"
          style={{
            height: "700px",
            backgroundImage: `url("http://qburo.com/wp-content/uploads/2019/03/4.jpg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h2>First Panel</h2>
          <p>This is your first panel</p>
        </div>
        <div
          className="amber"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/proxy/tFQYeuu0CbIgvrpY7dycilm42rYAhl3ntVnPwTnLOTvJ_fd6n3F6ZehpACmST5QzRoWAy6YNnv4mXUBQ-ZcU2VuM4jKUXTkCdriWZawaD1dcXtE")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h2>Second Panel</h2>
          <p>This is your second panel</p>
        </div>
        <div
          className="green"
          style={{
            backgroundImage: `url("https://img.jakpost.net/c/2018/03/30/2018_03_30_43096_1522405013._large.jpg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h2>Third Panel</h2>
          <p>This is your third panel</p>
        </div>
        <div
          className="blue"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/proxy/YmFd1iOBF6UycfjKeCabWrnfUSTmLIvk69O2I2h8KIBCrtmQSZFjJHRHF4QFwJFXhEdzEcUNOlrUb1CT3DW-BExJudICzdxu1GR5AixLBB4")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h2>Fourth Panel</h2>
          <p>This is your fourth panel</p>
        </div>
      </Carousel>
    </div>
  );
}

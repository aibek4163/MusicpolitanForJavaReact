import { Box, Button } from "@material-ui/core";

function Avatar(props) {
  return (
    <div className="main_wrapper">
      <div className="col s3">
        <img
          class="responsive-img"
          src="https://t2.genius.com/unsafe/375x0/https%3A%2F%2Fimages.genius.com%2F53af9b10c13d9765dd644d9fc0cb422b.1000x1000x1.jpg"
        />
        <form action="#">
          <div class="file-field input-field">
            <div class="btn" style={{ backgroundColor: "#ee6e73" }}>
              <span>File</span>
              <input type="file" />
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditProfile(props) {
  return (
    <form class="col s4 offset-s1">
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" class="validate" readOnly />
          <label for="email">Email</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="fullName" type="text" class="validate" />
          <label for="fullName">Full Name</label>
        </div>
      </div>
      <button
        class="btn waves-effect right"
        type="submit"
        name="action"
        style={{ backgroundColor: "#ee6e73" }}
      >
        Edit
      </button>
    </form>
  );
}

function ChangePassword(props) {
  return (
    <>
      <div className="main_wrapper">
        <div className="col s3"></div>
      </div>
      <form class="col s4 offset-s1">
        <div class="row">
          <div class="input-field col s12">
            <input id="old_password" type="password" class="validate" />
            <label for="password">Old Password</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="new_password" type="password" class="validate" />
            <label for="new_password">New Password</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="repassword" type="password" class="validate" />
            <label for="repassword">Repeat New Password</label>
          </div>
        </div>
        <button
          class="btn waves-effect right"
          type="submit"
          name="action"
          style={{ backgroundColor: "#ee6e73" }}
        >
          Change Password
        </button>
      </form>
    </>
  );
}

function AdminPanel(props) {
  return (
    <div className="main_wrapper">
      <div className="col s3 right">
        <div class="collection">
          <a href="#!" class="collection-item">
            Users
          </a>
          <a href="#!" class="collection-item">
            News
          </a>
          <a href="#!" class="collection-item">
            Reviews
          </a>
          <a href="#!" class="collection-item">
            Releases
          </a>
          <a href="#!" class="collection-item">
            Articles
          </a>
          <a href="#!" class="collection-item">
            Comments
          </a>
        </div>
      </div>
    </div>
  );
}

export function AdminProfile(props) {
  return (
    <>
      <div className="row">
        <Avatar />
        <EditProfile />
        <AdminPanel />
      </div>
      <div className="row">
        <ChangePassword />
      </div>
    </>
  );
}

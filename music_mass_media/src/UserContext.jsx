import React from "react";

const UserContext = React.createContext({
  email: "",
  fullName: "",
  avatat: "",
  auth: false,
  jwtToken: "",
});

export default UserContext;

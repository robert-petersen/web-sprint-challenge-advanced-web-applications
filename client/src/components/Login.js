import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const initialValues = {
  username: "",
  password: ""
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [loginForm, setLoginForm] = useState(initialValues);
  const history = useHistory();

  const handleChange = (evt) => {
    setLoginForm({
      ...loginForm,
      [evt.target.name]: evt.target.value
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios
    .post("http://localhost:5000/api/login", loginForm )
    .then((res)=>{
      localStorage.setItem("token", res.data.payload);
      history.push("/bubbles");
    })
    .catch((err)=>{
      console.log("Auth Axios Err: ", err);
    })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={handleSubmit} >
        <label>UserName:
          <input
            type="text"
            name="username"
            value={loginForm.username}
            onChange={handleChange}
          />
        </label>
        <label>Password:
          <input
            type="password"
            name="password"
            value={loginForm.password}
            onChange={handleChange}
          />
        </label>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;

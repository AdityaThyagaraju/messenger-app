import React, { useState } from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { user, setUser } = useContext(UserContext);
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const server_url = process.env.REACT_APP_SERVER_URL;

  async function login(e) {
    e.preventDefault();
    
    const tokenResponse = await fetch(server_url + '/user/login', {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        "username":username,
        "password":password
      }),
    });

    const token = await tokenResponse.text();
    
    const userResponse = await fetch(server_url + '/user/extract-user', {
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization" : `Bearer ${token}`
      }
    })

    const user = await userResponse.json();
    
    setUser(user);
    navigate("/");
  }

  return (
    <div className="bg-blue-800 min-h-screen flex items-center justify-center">
      <form className="min-w-96 bg-white min-h-64 rounded-lg" onSubmit={login}>
        <h3 className="text-lg font-semibold text-center mt-10">
          Login to your account
        </h3>
        <div className="m-1 mt-10 px-5">
        <div className="mt-3">
      <span>Username</span>
      <input
      onChange={(e)=>setUsername(e.target.value)}
        name="username"
        value={username}
        type="username"
        className="rounded border-2 border-gray-600 w-full p-2 mt-2 block"
      ></input>
    </div>
    <div className="mt-3">
      <span>Password</span>
      <input
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
        name="password"
        placeholder=""
        type="password"
        className="rounded border-2 border-gray-600 w-full p-2 mt-2 block"
      ></input>
    </div>
          <input className="mt-5 mx-2" type="checkbox" name="remember" />
          <label>Remember me</label>
          <button
            type="submit"
            className="bg-blue-800 text-white p-2 my-5 rounded block w-full hover:bg-black"
          >
            Login
          </button>
          <div className="text-center mb-10">
            <span>New to MyApp? </span>
            <a className="text-blue-900" href="/Signup">
              Sign up
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;

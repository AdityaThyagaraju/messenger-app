import React, { useState } from "react";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [about, setAbout] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const server_url = process.env.REACT_APP_SERVER_URL;

  async function signup(e) {
    e.preventDefault();
    const tokenResponse = await  fetch(server_url + "/user/register", {
      method: "POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        name:name,
        email:email,
        dob:dateOfBirth,
        about:about,
        username:userName,
        password:password
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
    <div className="bg-blue-800 min-h-screen flex items-center justify-center p-5">
      <form className="min-w-96 bg-white min-h-64 rounded-lg" onSubmit={signup}>
        <h3 className="text-lg font-semibold text-center mt-10">
          Create Account
        </h3>
        <div className="m-1 mt-10 px-5">
        <div className="mt-3">
      <span>Name</span>
      <input
      onChange={(e)=>setName(e.target.value)}
        name="name"
        placeholder="abc"
        value={name}
        type="text"
        className="rounded border-2 border-gray-600 w-full p-2 mt-2 block"
      ></input>
    </div>
    <div className="mt-3">
      <span>Email</span>
      <input
      onChange={(e)=>setEmail(e.target.value)}
        name="email"
        placeholder="abc@example.com"
        value={email}
        type="email"
        className="rounded border-2 border-gray-600 w-full p-2 mt-2 block"
      ></input>
    </div>
    <div className="mt-3">
      <span>Date of Birth</span>
      <input
      onChange={(e)=>setDateOfBirth(e.target.value)}
        name="dob"
        placeholder=""
        value={dateOfBirth}
        type="date"
        className="rounded border-2 border-gray-600 w-full p-2 mt-2 block"
      ></input>
    </div>
    <div className="mt-3">
      <span>About</span>
      <input
      onChange={(e)=>setAbout(e.target.value)}
        name="about"
        placeholder=""
        value={about}
        type="text"
        className="rounded border-2 border-gray-600 w-full p-2 mt-2 block"
      ></input>
    </div>
    <div className="mt-3">
      <span>Username</span>
      <input
      onChange={(e)=>setUserName(e.target.value)}
        name="username"
        placeholder=""
        value={userName}
        type="email"
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
          <button className="bg-blue-800 text-white p-2 my-5 rounded block w-full hover:bg-black">
            Sign up
          </button>
          <div className="text-center mb-10">
            <span>Already have an account? </span>
            <a className="text-blue-900" href="/">
              Login
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;

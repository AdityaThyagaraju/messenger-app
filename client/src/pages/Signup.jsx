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
    <div className="bg-blue-800 min-h-screen flex items-center justify-center p-5 gap-5">
    <div className="w-1/2 h-96 flex items-center justify-center p-5 ">
      <h1 className="text-9xl text-sky-100 fixed top-72 left-40">StarTT noW!</h1>
    </div>
  <form className="min-w-96 bg-white min-h-64 rounded-lg shadow-lg p-8 w-full max-w-md" onSubmit={signup}>
    <h3 className="text-lg font-semibold text-center mb-6 text-gray-800">
      Create Account
    </h3>
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          name="name"
          placeholder="Enter your name"
          value={name}
          type="text"
          className="rounded border border-gray-150 w-full p-3 block shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          placeholder="abc@example.com"
          value={email}
          type="email"
          className="rounded border border-gray-150 w-full p-3 block shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
        <input
          onChange={(e) => setDateOfBirth(e.target.value)}
          name="dob"
          value={dateOfBirth}
          type="date"
          className="rounded border border-gray-150 w-full p-3 block shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
        <textarea
          onChange={(e) => setAbout(e.target.value)}
          name="about"
          placeholder="Tell us about yourself"
          value={about}
          className="rounded border border-gray-150 w-full p-3 block shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          onChange={(e) => setUserName(e.target.value)}
          name="username"
          placeholder="Choose a username"
          value={userName}
          type="text"
          className="rounded border border-gray-150 w-full p-3 block shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          placeholder="Enter your password"
          type="password"
          className="rounded border border-gray-150 w-full p-3 block shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex items-center">
        <input className="mr-2 rounded border border-gray-150 focus:ring-blue-500" type="checkbox" name="remember" />
        <label className="text-sm text-gray-700">Remember me</label>
      </div>

      <button
        type="submit"
        className="bg-blue-800 text-white p-3 mt-5 rounded-lg w-full shadow-md hover:bg-blue-900 focus:ring-4 focus:ring-blue-500 focus:outline-none">
        Sign up
      </button>

      <div className="text-center mt-6">
        <span className="text-sm text-gray-600">Already have an account? </span>
        <a className="text-blue-800 font-medium hover:underline" href="/">
          Login
        </a>
      </div>
    </div>
  </form>
</div>

  );
}

export default Signup;

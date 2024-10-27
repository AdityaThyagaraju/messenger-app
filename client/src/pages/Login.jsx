import React, { useState } from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { user, setUser } = useContext(UserContext);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    const savedUserResponse = await fetch("http://127.0.0.1:3001/Login", {
      method: "POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        email:email,
        password:password
      }),
    });
    savedUserResponse.json().then((newUser)=>{
      setUser(newUser);
      navigate("/Integrate");
    })
  }

  return (
    <div className="bg-blue-800 min-h-screen flex items-center justify-center">
      <form className="min-w-96 bg-white min-h-64 rounded-lg" onSubmit={login}>
        <h3 className="text-lg font-semibold text-center mt-10">
          Login to your account
        </h3>
        <div className="m-1 mt-10 px-5">
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

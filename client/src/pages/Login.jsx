import React, { useState } from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const server_url = process.env.REACT_APP_SERVER_URL;

  async function login(e) {
    e.preventDefault();

    // Basic Validation
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const tokenResponse = await fetch(server_url + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!tokenResponse.ok) {
        setError("Invalid username or password.");
        return;
      }

      const token = await tokenResponse.text();

      if (!token) {
        setError("Invalid username or password.");
        return;
      }

      const userResponse = await fetch(server_url + "/user/extract-user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!userResponse.ok) {
        setError("Failed to fetch user data.");
        return;
      }

      const user = await userResponse.json();
      setUser(user);
      navigate("/");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="bg-blue-800 min-h-screen flex items-center justify-center p-5 gap-5">
      <div className="w-1/2 h-96 flex items-center justify-center ">
        <h1 className="text-9xl text-sky-100">Welcome..</h1>
      </div>
      <form
        className="min-w-1/3 bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
        onSubmit={login}
      >
        <h3 className="text-lg font-semibold text-center mb-6 text-gray-800">
          Login to your account
        </h3>
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              value={username}
              type="text"
              placeholder="Enter your username"
              className="rounded border border-gray-150 w-full p-3 block shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              placeholder="Enter your password"
              className="rounded border border-gray-150 w-full p-3 block shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              className="mr-2 rounded border border-gray-150 focus:ring-blue-500"
              type="checkbox"
              name="remember"
            />
            <label className="text-sm text-gray-700">Remember me</label>
          </div>

          <button
            type="submit"
            className="bg-blue-800 text-white p-3 mt-5 rounded-lg w-full shadow-md hover:bg-blue-900 focus:ring-4 focus:ring-blue-500 focus:outline-none"
          >
            Login
          </button>

          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">New to MyApp? </span>
            <a
              className="text-blue-800 font-medium hover:underline"
              href="/Signup"
            >
              Sign up
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;

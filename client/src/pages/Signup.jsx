import React, { useState } from "react";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [about, setAbout] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const server_url = process.env.REACT_APP_SERVER_URL;

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    return password.length >= 8;
  }

  function isValidDate(date) {
    const today = new Date();
    const enteredDate = new Date(date);
    return enteredDate <= today;
  }

  async function signup(e) {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !dateOfBirth || !userName || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!isValidDate(dateOfBirth)) {
      setError("Date of Birth cannot be in the future.");
      return;
    }

    try {
      const tokenResponse = await fetch(server_url + "/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          dob: dateOfBirth,
          about,
          username: userName,
          password,
        }),
      });

      if (!tokenResponse.ok) {
        const errorResponse = await tokenResponse.json();
        setError(errorResponse.message || "Registration failed.");
        return;
      }

      const token = await tokenResponse.text();

      const userResponse = await fetch(server_url + "/user/extract-user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!userResponse.ok) {
        const errorResponse = await userResponse.json();
        setError(errorResponse.message || "Failed to fetch user data.");
        return;
      }

      const user = await userResponse.json();
      setUser(user);
      navigate("/");
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    }
  }

  return (
    <div className="bg-blue-800 min-h-screen flex items-center justify-center p-5 gap-5">
      <div className="w-1/2 h-96 flex items-center justify-center p-5 ">
        <h1 className="text-9xl text-sky-100 fixed top-72 left-40">Join Now!</h1>
      </div>
      <form
        className="min-w-96 bg-white min-h-64 rounded-lg shadow-lg p-8 w-full max-w-md"
        onSubmit={signup}
      >
        <h3 className="text-lg font-semibold text-center mb-6 text-gray-800">
          Create Account
        </h3>
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              onChange={(e) => setDateOfBirth(e.target.value)}
              name="dob"
              value={dateOfBirth}
              type="date"
              className="rounded border border-gray-150 w-full p-3 block shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              About
            </label>
            <textarea
              onChange={(e) => setAbout(e.target.value)}
              name="about"
              placeholder="Tell us about yourself"
              value={about}
              className="rounded border border-gray-150 w-full p-3 block shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Enter your password"
              type="password"
              className="rounded border border-gray-150 w-full p-3 block shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Re-enter Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
              placeholder="Re-enter your password"
              type="password"
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

import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserContext from "./context/UserContext";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(null);

  const getUser = async (token)=>{
      let userRaw = await fetch(
        `http://localhost:8080/user/extract-user`,
        {
          method:"GET",
          headers:{
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
          }
        }
      );
  
      let newUser = await userRaw.json();
      
      setUser(newUser);
    }
    
  useEffect(() => {
    let savedToken = sessionStorage.getItem("token");
    
    if (savedToken && savedToken!="" && !user) {
      getUser(savedToken);
    }
    else if(user){
      sessionStorage.setItem("token", user.token);
    }
  }, [user]);

  return (
    <div className="text-gray-700">
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user == null ? <Login /> : <Home />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;

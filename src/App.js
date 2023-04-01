import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import About from "./Pages/About";
import Account from "./Pages/Account";
import Home from "./Pages/Canvas/Home";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";

const userhost = process.env.REACT_APP_BACKEND_URL + "/users";

function App() {
  const [activeUser, setActiveUser] = useLocalStorage("activeUser", { _id: "", username: "", pixelTime: "", userType: "" });
  const [isLoggedIn, setLoginStatus] = useLocalStorage("loginStatus", false);

  async function updateUserTime() {
    try {
      const response = await axios.patch(userhost, {user: activeUser});
      setActiveUser(response.data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home 
          activeUser={activeUser} 
          isLoggedIn={isLoggedIn} 
          updateUserTime={updateUserTime} 
        />} />

        <Route path="/About" element={<About 
          isLoggedIn={isLoggedIn}  
        />} />

        <Route path="/Account" element={<Account 
          activeUser={activeUser} 
          isLoggedIn={isLoggedIn} 
        />} />
        
        <Route path="/Login" element={<Login 
          setActiveUser={setActiveUser} 
          isLoggedIn={isLoggedIn}  
          setLoginStatus={setLoginStatus} 
        />} />

        <Route path="/Logout" element={<Logout 
          setActiveUser={setActiveUser} 
          setLoginStatus={setLoginStatus} 
        />} />
      </Routes>
    </div>
  );
}

// Taken from https://usehooks.com/useLocalStorage/
// Used to store state data into local storage for refresh persistence 
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } 
    catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } 
    catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default App;
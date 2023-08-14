import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/navbar'
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Post from './components/Post'
import Login from './components/Login'

function App() {
  const [user,setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then((response)=>{
        if(response.status === 200) return response.json();
        throw new Error("Authentication failed");
      }).then(resObject =>{
        setUser(resObject.user);
      }).catch((err)=>{
        console.log(err);
      })
    }
    getUser();
  }, []);
  console.log(user)
  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/post/:id" element={user ? <Post /> : <Navigate to="/login" />} />
        <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

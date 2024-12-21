import React from "react";
import "./style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/home/HomePage";
import AboutUs from "../../pages/about/AboutUs";
import ContactUs from "../../pages/contact/ContactUs";
import NavBar from "./NavBar";
import PostDetails from "../../features/posts/Details/postDetails";
function Header() {
  return (
    <Router>
      <NavBar />
      <div className="mainContainer">
        <Routes>
        <Route path="/post-details/:id" exact element={<PostDetails/>} Component={PostDetails}/>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Header;

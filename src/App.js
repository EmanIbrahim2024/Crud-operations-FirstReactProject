import React from 'react';
import Header from './shared/header/Header';
import Footer from './shared/footer/Footer';
import routesRouter from './routes/routes';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostDetails from './features/posts/Details/postDetails';

function App() {
  return (
   <>
      <Header />
   
      <Footer />
      </>

      
  );
}

export default App;

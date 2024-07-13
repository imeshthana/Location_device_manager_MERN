import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './screens/home';
import Location from './screens/location';
import './App.css';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/location/:id" element={<Location />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

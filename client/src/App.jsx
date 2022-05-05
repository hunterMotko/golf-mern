import { useState, useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainContext } from './context/Main';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home';
import Courses from './components/Courses';
import Course from './components/Course';
import ScoreCards from './components/ScoreCards';
import Card from './components/Card';
import Handicap from './components/Handicap';

function App() {
  const { getLocation } = useContext(MainContext);

  useEffect(()=>{
    getLocation();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/course/:name/:zip' element={<Course/>} />
          <Route path='/courses' element={<Courses/>} />
          <Route path='/cards' element={<ScoreCards/>} />
          <Route path='/card/:id' element={<Card/>} />
          <Route path='/handicap' element={<Handicap/>} />

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

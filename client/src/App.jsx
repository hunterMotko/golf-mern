import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home'
function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

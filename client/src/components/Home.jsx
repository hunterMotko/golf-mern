import React from 'react'
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 text-center bg-dark rounded m-3 p-2 opacity-75 text-white">
          <h1>Welcome To Golf Tracker</h1>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-md-6 text-center bg-dark rounded m-3 p-2 opacity-75 text-white">
          <h2>Find Courses Near You</h2>
          <button className='btn btn-outline-success'>
            <Link to='/courses'>
              Golf Now
            </Link>
          </button>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 text-center bg-dark rounded m-3 p-2 opacity-75 text-white">
          <h2>Track Your Score</h2>
          <button className='btn btn-outline-success'>Track</button>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 text-center bg-dark rounded m-3 p-2 opacity-75 text-white">
          <h2>Calculate Your Handicap</h2>
          <button className='btn btn-outline-success'>Track</button>
        </div>
      </div>
    </div>
  )
}

export default Home
import React, {createContext, useState, useEffect, useRef} from 'react';
import axios from 'axios';

export const MainContext = createContext({});

export const MainProvider = props => {
  const [coord, setCoord] = useState({radius: '20', lng: '', lat: ''});
  const [courses, setCourses] = useState([])
  const [user, setUser] = useState({});

  const getCourses = async(loc) =>{
    const key = import.meta.env.VITE_RAPID_KEY;

    const options = {
      method: 'GET',
      url: 'https://golf-course-finder.p.rapidapi.com/courses',
      params: loc,
      headers: {
        'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com',
        'X-RapidAPI-Key': key
      }
    };

    try {
      let res = await axios.request(options);

      if (res.data.courses.length > 0) {
        setCourses(res.data.courses);
      }
    } catch (e) {
      console.error('COURSE_API', e);
    }
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }

  function showPosition(position) {
    setCoord({
      ...coord,
      lng: position.coords.longitude,
      lat: position.coords.latitude
    })
  }

  useEffect(()=>{
    if (coord.lat !== '' && coord.lng !== '') {
      getCourses(coord)
    }
  }, [coord])

  const value = {
    user,
    setUser,
    courses,
    getLocation
  }

  return (
    <MainContext.Provider value={value}>
      {props.children}
    </MainContext.Provider>
  )
}
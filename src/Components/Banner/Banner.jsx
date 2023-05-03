import React, { useEffect, useState } from 'react'
import {API_KEY,imageUrl} from '../../constants/constants'
import axios from '../../constants/axios'
import './Banner.css'

function Banner() {
  const [movies, setMovies] = useState([])
  const [randomNum, setRandomNum] = useState(0);

  useEffect(()=>{
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      setMovies(response.data.results);
    })
  },[])

  useEffect(() => {
    setRandomNum(Math.floor(Math.random() * movies.length));
    const intervalId = setInterval(() => {
      setRandomNum(Math.floor(Math.random() * movies.length));
    }, 3000);
    return () => clearInterval(intervalId);
  }, [movies]);

  const movie = movies[randomNum];

  return (
    <div
      style={{backgroundImage:`url(${movie? imageUrl+movie.backdrop_path :""})`}} 
      className='banner'>
        <div className='content'>
            <h1 className='title'>{movie ? movie.title : ""}</h1>
            <div className='banner_buttons'>
              <button className='button'>Play</button>
              <button className='button'>My list</button>
            </div>
            <h1 className='description'>{movie ? movie.overview : ""}</h1>
        </div>
        <div className="fade_bottom"></div>
    </div>
  )
}

export default Banner

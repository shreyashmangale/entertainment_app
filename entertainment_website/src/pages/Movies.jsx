import React, { Suspense, useEffect, useState } from 'react'
import SideNavbar from '../components/SideNavbar'
import FallbackPage from '../components/FallbackPage';
import axios from 'axios'
import FetchedMovies from '../components/FetchedData/FetchedMovies';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [searchedName, setSearchedName] = useState('');

  const handleSearchedName = (e) => {
    setSearchedName(e.target.value);
  }
  //console.log(movieName);
  

  return (
    <div className='lg:ps-8 lg:py-12'>
      {/* <h1 className='text-center text-white text-4xl'>Movies</h1> */}
      <SideNavbar />

      <div className="relative lg:left-32 left-0 lg:top-0 lg:w-[93%] w-full h-[100vh] bg-transparent lg:px-8 px-4">
        <div className="sm:ps-8 py-8">
          <form className='flex flex-row gap-8 items-center'>
            <input className='bg-transparent text-white text-xl lg:placeholder:text-2xl placeholder:text-lg py-4 w-[400px] outline-none focus:border-b-2 focus:border-gray-50 focus:text-xl focus:text-white caret-red-500' type="text" name="search" placeholder="Search for Movies or TV Series" onChange={(e)=>handleSearchedName(e)}/>
            
            <Link to={`/searchmovies/${searchedName}`}>
            <i class="fa-solid fa-magnifying-glass fa-2xl" style={{ color: "#ffffff" }} ></i></Link>

          </form>
        </div>

        {/* Trending Movies slide */}
        <div className='sm:ps-6 sm:py-8'>
          <div>
            <h1 className='text-4xl text-white'>Movies</h1>


            <Suspense fallback={<FallbackPage />}>

              <FetchedMovies />

            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movies
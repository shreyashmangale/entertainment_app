import React, { Suspense, useEffect, useState } from 'react'
import SideNavbar from '../components/SideNavbar'
import axios from 'axios';
import FetchedTvseries from '../components/FetchedData/FetchedTvseries';
import FallbackPage from '../components/FallbackPage';
import { Link } from 'react-router-dom';


const TvSeries = () => {
  const [searchedName, setSearchedName] = useState('');

  const handleSearchedName = (e) => {
    setSearchedName(e.target.value);
  }
 
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
            <h1 className='text-4xl text-white'>Tv Series</h1>
            <Suspense fallback={<FallbackPage />}>

              <FetchedTvseries />

            </Suspense>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default TvSeries
import React, { useContext, useState } from 'react'
import logo from '../assets/logo.jpg';
import TrendingMovies from '../components/TrendingMovies';
import Recommended from '../components/Recommended';
import SideNavbar from '../components/SideNavbar';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';




const Home = () => {

  const { currentUser, logout } = useContext(AuthContext);
  console.log(currentUser);
  

  const [searchedName, setSearchedName] = useState('');

  const handleSearchedName = (e) => {
    setSearchedName(e.target.value);
  }
  //console.log(movieName);
  return (

    <div className=''>
      <SideNavbar />



      <div className="relative lg:left-32 left-0 lg:top-0 lg:w-[93%] w-full h-[100vh] bg-transparent lg:px-8 px-4">
        <div className="ps-8 py-8">
          <form className='flex flex-row gap-8 items-center'>
            <input className='bg-transparent text-white text-xl lg:placeholder:text-2xl placeholder:text-lg p-4 w-[400px] outline-none focus:border-b-2 focus:border-gray-50 focus:text-xl focus:text-white caret-red-500' type="text" name="search" placeholder="Search for Movies or TV Series" onChange={(e) => handleSearchedName(e)} />

            <Link to={`/searchmovies/${searchedName}`}>
              <i class="fa-solid fa-magnifying-glass fa-2xl" style={{ color: "#ffffff" }} ></i></Link>

          </form>
        </div>

        {/* Trending Movies slide */}
        <div className='lg:ps-8 py-8'>
          <TrendingMovies />

          <Recommended />
        </div>
      </div>
    </div>

  )
}

export default Home
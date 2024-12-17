import React, { useContext, useEffect, useState } from 'react'
import SideNavbar from '../components/SideNavbar'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Bookmarked = () => {

  // const BookmarkedMovies = [1, 2, 3, 4, 5, 6, 7]
  // const BookmarkedTvSeries = [1, 2, 3, 4, 5]
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate()


  // const [bookmarked, setBookmarked] = useState([]);
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [bookmarkedTvseries, setBookmarkedTvseries] = useState([]);

  const [searchedName, setSearchedName] = useState('');

  const handleSearchedName = (e) => {
    setSearchedName(e.target.value);
  }

  async function fetchData() {
    try {
      // const response = await fetch('http://localhost:5000/bookmarked', {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //   },
      // });

      const token = localStorage.getItem('access_token');


      const response = await axios.get('http://localhost:5000/bookmarked', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
      const items = await response.data;
    //console.log("items are ", items);
      const movies = items.filter(item => item!==null && item.contentType === 'movie');
      const tvseries = items.filter(item => item!==null && item.contentType === 'show');
      setBookmarkedMovies(movies);
      setBookmarkedTvseries(tvseries);
      // console.log(movies);

      // Optionally clear form fields after submission

    } catch (error) {
    //console.log(error);

    }
  }
  useEffect(() => {

    fetchData();
  }, [])




  const removeFromBookmarked = async (item_id) => {
    // e.preventDefault();
  //console.log(item_id);

    try {
      const card = document.getElementById(`card-${item_id}`);

      // Apply fade-out and scale-down effect
      card.classList.add('opacity-0', 'scale-90');

      const token = localStorage.getItem('access_token');


      // Wait for the transition to finish, then remove the element
      setTimeout(async() => {
        const response = await axios.delete(`http://localhost:5000/bookmarked/${item_id}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      //console.log(response)

        const new_bookmarked_movies = bookmarkedMovies.filter(item => item._id != item_id)
        const new_bookmarked_tvseries = bookmarkedTvseries.filter(item => item._id != item_id)
        setBookmarkedMovies(new_bookmarked_movies);
        setBookmarkedTvseries(new_bookmarked_tvseries);
      }, 500);
      card.classList.add('opacity-100', 'scale-100');

    } catch (error) {
    //console.log("error deleting item");

    }
  };


  return (
    <div className='lg:ps-8 lg:py-12'>
      {/* <h1 className='text-center text-white text-4xl'>Movies</h1> */}
      <SideNavbar />

      <div className="relative lg:left-32 left-0 lg:top-0 lg:w-[93%] w-full h-[100vh] bg-transparent lg:px-8 px-4">
        <div className="sm:ps-8 py-8">
          <form className='flex flex-row gap-8 items-center'>
            <input className='bg-transparent text-white text-xl lg:placeholder:text-2xl placeholder:text-lg p-4 w-[400px] outline-none focus:border-b-2 focus:border-gray-50 focus:text-xl focus:text-white caret-red-500' type="text" name="search" placeholder="Search for Movies or TV Series" onChange={(e) => handleSearchedName(e)} />
            <Link to={`/searchmovies/${searchedName}`}>
              <i class="fa-solid fa-magnifying-glass fa-2xl" style={{ color: "#ffffff" }} ></i></Link>
          </form>
        </div>


        {currentUser !== null ? <div className='sm:ps-6 py-8'>
          <div>
            <h1 className='text-4xl text-white'>Bookmarked Movies</h1>

            <div class="w-full">
              <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
                {
                  bookmarkedMovies.length > 0 ? bookmarkedMovies.map((item) => {
                    return (
                      <li>
                        <div id={`card-${item._id}`} className='relative card  w-full sm:h-[280px] h-[140px] rounded-lg transition transform 0.3s ease-in-out bg-transparent'>
                          <div className='absolute top-2 right-4 w-[40px] h-[40px] rounded-full flex items-center justify-center backdrop-opacity-10 backdrop-invert bg-white/30'>
                            <i className="fa-solid fa-bookmark fa-lg cursor-pointer" style={{ color: "#ffffff" }} onClick={() => removeFromBookmarked(item._id)}></i>
                          </div>
                          <img className='w-full sm:h-[200px] h-[140px] object-cover rounded-lg' src={item.backdrop_path} alt="" />


                          <div className="absolute bottom-2 bg-transparent text-white p-2">
                            <div className="flex gap-4 text-sm text-slate-300 my-1">
                              <p>{item.release_date && item.release_date.split('-')[0]}</p>
                              <p><i className="fa-solid fa-film cursor-pointer mr-1" style={{ color: "#b4b4d2" }}></i>{item.contentType}</p>
                              <p>PG</p>
                            </div>
                            <div>
                              <Link to={`/movies/${item._id}`}>
                                <h2 className='text-xl'>{item.title}</h2>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  }
                  ) :
                    <div>
                      <h1 className='text-red-500 text-md'>No movies bookmarked</h1>
                    </div>
                }

              </div>
            </div>
          </div>


          <div className='mt-24'>
            <h1 className='text-4xl text-white'>Bookmarked Tv Series</h1>

            <div class="w-full">
              <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
                {
                  bookmarkedTvseries.length > 0 ? bookmarkedTvseries.map((item) => {
                    return (
                      <li>
                        <div id={`card-${item._id}`} className='relative card  w-full sm:h-[280px] h-[140px] rounded-lg bg-transparent'>
                          <div className='absolute top-2 right-4 w-[40px] h-[40px] rounded-full flex items-center justify-center backdrop-opacity-10 backdrop-invert bg-white/30'>
                            <i className="fa-solid fa-bookmark fa-lg cursor-pointer" style={{ color: "#ffffff" }} onClick={() => removeFromBookmarked(item._id)}></i>
                          </div>
                          <img className='w-full sm:h-[200px] h-[140px] object-cover rounded-lg' src={item.backdrop_path} alt="" />


                          <div className="absolute bottom-2 bg-transparent text-white p-2">
                            <div className="flex gap-4 text-sm text-slate-300 my-1">
                              <p>{item.first_aired.split("-")[0]}</p>
                              <p><i className="fa-solid fa-film cursor-pointer mr-1" style={{ color: "#b4b4d2" }}></i>{item.contentType}</p>
                              <p>PG</p>
                            </div>
                            <div>
                              <Link to={`/tvseries/${item._id}`}>
                                <h2 className='text-xl'>{item.title}</h2>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  }) :
                    <div>
                      <h1 className='text-red-500 text-md'>No shows bookmarked</h1>
                    </div>
                }

              </div>
            </div>
          </div>
        </div> :
          <div className='w-full h-[40vh] flex flex-col items-center justify-center gap-4'>
            <h1 className='text-2xl text-white'>Please Log In to see bookmarked movies and shows</h1>
            <button className='bg-red-500 text-white px-4 py-2 rounded-lg' onClick={() => navigate('/auth/login')}>Login</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Bookmarked
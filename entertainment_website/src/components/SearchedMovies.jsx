import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SideNavbar from './SideNavbar'
import axios from 'axios';
import FallbackPage from './FallbackPage';
import { AuthContext } from '../context/authContext';
import AuthModal from './Modal';

const SearchedMovies = () => {

    const navigate = useNavigate()

    const { currentUser } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);
    

    const location = useLocation();
    // const movie_name = location.pathname.split("/")[2];
    // console.log(movie_name);


    const [searchedName, setSearchedName] = useState(location.pathname.split("/")[2]);
    const [category, setCategory] = useState(location.pathname.split("/")[1]);
    const [loading, setLoading] = useState(false);
    const [searchedItem, setSearchedItem] = useState([]);
    const handleSearchedName = (e) => {
        setSearchedName(e.target.value);
      }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://entertainment-app-backend-6jyh.onrender.com/search?searchedName=${searchedName}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();

              //console.log(result);


                if (result) { // only set data if component is mounted
                    setSearchedItem(result);
                    setLoading(false);
                  //console.log(result);

                }
            } catch (error) {
              //console.log(error);
            }
        };

        fetchData();

    }, [searchedName])

    const addToBookmarked = async (item) => {
        // e.preventDefault();

        const newItem = {
            userEmail: currentUser.email,
            data : item
        };
        // console.log(newItem);

        try {
            const token = localStorage.getItem('access_token');

            const response = await axios.post('https://entertainment-app-backend-6jyh.onrender.com/bookmarked', newItem,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(response.status === 200) {
              //console.log(response.data);
            }

            // Optionally clear form fields after submission

        } catch (error) {
            if(error.status === 409){
              //console.log("Already added");
                
            }

        }
    };

    const handleAddToBookmarked = (item) => {
        if(currentUser) {
            addToBookmarked(item);
        }else {
            setShowModal(true);
            // navigate('/login')
        }
    }

    const handleCloseModal = () => setShowModal(false);

    return (
        <>
        <div className='lg:ps-8 lg:py-12 '>
            {/* <h1 className='text-center text-white text-4xl'>Movies</h1> */}
            <SideNavbar />

            <div className="relative lg:left-32 left-0 lg:top-0 lg:w-[93%] w-full h-[100vh] bg-transparent lg:px-8 px-4">
                <div className="sm:ps-8 py-8">
                    <form className='flex flex-row gap-8 items-center'>
                        <input className='bg-transparent text-white text-xl placeholder:text-2xl p-4 w-[400px] outline-none focus:border-b-2 focus:border-gray-50 focus:text-xl focus:text-white caret-red-500' type="text" name="search" placeholder="Search for Movies or TV Series" onChange={(e)=>handleSearchedName(e)}/>
                        <Link to={`/searchmovies/${searchedName}`}>
                            <i class="fa-solid fa-magnifying-glass fa-2xl" style={{ color: "#ffffff" }} ></i>
                        </Link>
                    </form>
                </div>

                <div className='sm:ps-6 py-8'>
                <AuthModal show={showModal} handleClose={handleCloseModal} />

                    <div>
                        <h1 className='lg:text-4xl text-3xl text-white'>Searched Movies for {searchedName.split("%20").join(" ")}</h1>
                        <div class="w-full">
                            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {   loading ? <div><FallbackPage /></div> :
                                    searchedItem.length > 0 ? searchedItem.map((item) => {
                                        return (
                                            <li>
                                                <div className='relative card w-full sm:h-[280px] h-[140px] mr-4 rounded-lg bg-[#191f2f] shadow-lg'>
                                                    <div className='absolute top-2 right-4 w-[40px] h-[40px] rounded-full flex items-center justify-center backdrop-opacity-10 backdrop-invert bg-white/30'>
                                                        <i className="fa-regular fa-bookmark fa-lg cursor-pointer" style={{ color: "#ffffff" }} onClick={()=>handleAddToBookmarked(item)}></i>
                                                    </div>
                                                    <img className='w-full h-[200px] object-cover rounded-lg' src={item.backdrop_path} alt="" />


                                                    <div className="absolute bottom-2 bg-transparent text-white p-2">
                                                        <div className="flex gap-4 text-sm text-slate-300 my-1">
                                                            <p>{item.release_date ? item.release_date.split('-')[0] : item.first_aired.split('-')[0]}</p>
                                                            <p><i className="fa-solid fa-film cursor-pointer mr-1" style={{ color: "#b4b4d2" }}></i>{item.contentType}</p>
                                                            <p>PG</p>
                                                        </div>
                                                        <div>
                                                            <Link to={item.contentType === 'movie' ? `/movies/${item._id}` : `/tvseries/${item._id}`}>
                                                                <h2 className='text-xl'>{item.title}</h2>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    }) : 
                                    <h1>No data</h1>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SearchedMovies
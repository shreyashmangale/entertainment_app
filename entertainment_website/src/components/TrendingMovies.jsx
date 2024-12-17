import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext';
import AuthModal from './Modal';

const TrendingMovies = () => {
    const navigate = useNavigate()

    const { currentUser } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);

    const [trending, setTrending] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        try {
            const response = await axios.get('https://entertainment-app-backend-6jyh.onrender.com/trending');
            const items = await response;
            //console.log(items.data[0].movies);

            setTrending(items.data[0].movies.slice(0, 5));
            // console.log(response.data.data);

            // Optionally clear form fields after submission

        } catch (error) {
          //console.log("error");
        }
    }


    const addToBookmarked = async (item) => {
        // e.preventDefault();

        const newItem = {
            userEmail: currentUser.email,
            data: item
        };
        // console.log(newItem);

        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post('https://entertainment-app-backend-6jyh.onrender.com/bookmarked', newItem, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
              //console.log(response.data);
            }

            // Optionally clear form fields after submission

        } catch (error) {
            if (error.status === 409) {
              //console.log("Already added");

            }

        }
    };

    const handleAddToBookmarked = (item) => {
        if (currentUser) {
            addToBookmarked(item);
        } else {
            setShowModal(true);
            // navigate('/login')
        }
    }
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className='w-auto'>

            <h1 className='text-4xl text-white'>Trending</h1>
            <AuthModal show={showModal} handleClose={handleCloseModal} />

            <div className="w-full overflow-x-auto whitespace-nowrap" style={{ scrollbarWidth: "none" }}>
                <div className="flex gap-6">
                    {
                        trending.length > 0 ? trending.map((item) => {
                            return (
                                <li>
                                    <div className='relative card sm:w-[550px] w-[270px] lg:h-[250px] h-[150px] bg-[#191f2f] shadow-lg mr-4 rounded-lg hover:opacity-70 hover:cursor-pointer hover:transition ease-in-out'>
                                        <div className='absolute top-2 right-4 w-[50px] h-[50px] rounded-full flex items-center justify-center backdrop-opacity-10 backdrop-invert bg-white/30' onClick={()=>handleAddToBookmarked(item)}>
                                            <i className="fa-regular fa-bookmark fa-lg cursor-pointer" style={{ color: "#ffffff" }}></i>
                                        </div>
                                        
                                        <img className='w-full h-full object-cover rounded-lg' src={item.backdrop_path} alt="" />

                                        <div className="absolute sm:bottom-5 bottom-2 sm:left-4 left-2 bg-transparent text-white p-2">
                                            <div className="flex gap-4 text-sm text-slate-300 my-1">
                                                <p>{item.first_aired ? item.first_aired.split('-')[0] : item.release_date.split('-')[0]}</p>
                                                <p><i className="fa-solid fa-film cursor-pointer mr-1" style={{ color: "#b4b4d2" }}></i>{item.contentType}</p>
                                                <p>PG</p>
                                            </div>
                                            <div>
                                                <Link to={item.contentType === 'movie' ? `/movies/${item._id}` : `/tvseries/${item._id}`}>
                                                    <h2 className='text-wrap sm:text-xl text-lg'>{item.title}</h2>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </li>
                            )
                        }) :
                            <div></div>
                    }

                </div>
            </div>


        </div >
    )
}

export default TrendingMovies
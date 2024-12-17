import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import AuthModal from './Modal';

const Recommended = () => {

    const navigate = useNavigate()

    const { currentUser } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);


    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [recommended, setRecommended] = useState([]);

    async function getRecommended() {
        try {
            const response = await axios.get('https://entertainment-app-backend-6jyh.onrender.com/recommended');
            const items = await response;
            //console.log(items.data[0].movies);

            setRecommended(items.data[0].movies);
            // console.log(response.data.data);

            // Optionally clear form fields after submission

        } catch (error) {
          //console.log("error");
        }
    }
    useEffect(() => {
        getRecommended();
    }, [])


    const addToBookmarked = async (item) => {
        // e.preventDefault();

        const newItem = {
            userEmail: currentUser.email,
            data: item
        };
        // console.log(newItem);

        try {
            const token = localStorage.getItem('access_token');

            const response = await axios.post('https://entertainment-app-backend-6jyh.onrender.com/bookmarked', newItem,{
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
        <div className='mt-12'>
            <AuthModal show={showModal} handleClose={handleCloseModal} />

            <h1 className='text-4xl text-white'>Recommended for you</h1>

            <div class="w-full">
                <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                    {
                        recommended.map((item) => {
                            return (
                                <li>
                                    <div className='relative card  w-full sm:h-[280px] h-[140px] rounded-lg bg-[#191f2f] shadow-lg'>
                                        <div className='absolute top-2 right-4 w-[40px] h-[40px] rounded-full flex items-center justify-center backdrop-opacity-10 backdrop-invert bg-white/30' onClick={() => handleAddToBookmarked(item)}>
                                            <i className="fa-regular fa-bookmark fa-lg cursor-pointer" style={{ color: "#ffffff" }}></i>
                                        </div>
                                        <img className='w-full sm:h-[200px] h-[140px] object-cover rounded-lg' src={item.backdrop_path} alt="" />


                                        <div className="absolute bottom-2 bg-transparent  text-white px-2">
                                            <div className="flex gap-4 text-sm text-slate-300 my-1">
                                                <p>{item.first_aired ? item.first_aired.split('-')[0] : item.release_date.split('-')[0]}</p>
                                                <p><i className="fa-solid fa-film cursor-pointer mr-1" style={{ color: "#b4b4d2" }}></i>{item.contentType}</p>
                                                <p>PG</p>
                                            </div>
                                            <div>
                                                <Link to={item.contentType === 'movie' ? `/movies/${item._id}` : `/tvseries/${item._id}`}>
                                                    <h2 className='sm:text-xl text-lg'>{item.title}</h2>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }





                    {/* <li>
                        <div className='card w-[340px] h-[200px] bg-red-200 mr-4 rounded-lg'>
                            1
                        </div>
                    </li>
                    <li>
                        <div className='card w-[340px] h-[200px] bg-red-200 mr-4 rounded-lg'>
                            1
                        </div>
                    </li>
                    <li>
                        <div className='card w-[340px] h-[200px] bg-red-200 mr-4 rounded-lg'>
                            1
                        </div>
                    </li>
                    <li>
                        <div className='card w-[340px] h-[200px] bg-red-200 mr-4 rounded-lg'>
                            1
                        </div>
                    </li>
                    <li>
                        <div className='card w-[340px] h-[200px] bg-red-200 mr-4 rounded-lg'>
                            1
                        </div>
                    </li>
                    <li>
                        <div className='card w-[340px] h-[200px] bg-red-200 mr-4 rounded-lg'>
                            1
                        </div>
                    </li>
                    <li>
                        <div className='card w-[340px] h-[200px] bg-red-200 mr-4 rounded-lg'>
                            1
                        </div>
                    </li> */}
                </div>
            </div>
        </div>
    )
}

export default Recommended
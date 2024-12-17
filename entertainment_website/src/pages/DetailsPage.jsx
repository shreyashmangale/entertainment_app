import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FallbackPage from '../components/FallbackPage';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import AuthModal from '../components/Modal';

const DetailsPage = () => {
    const navigate = useNavigate()

    const { currentUser } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    
    const category = location.pathname.split('/')[1];
  //console.log(category);
    const id = location.pathname.split('/')[2];
  //console.log(id);
    

    const [item, setItem] = useState(null);

    const [similarItems, setSimilarItems] = useState([]);

    const [seasons, setSeasons] = useState([]);

    useEffect(()=>{
    const fetchData = async () => {
        const url = category === 'movies' ? `http://localhost:5000/movies/${Number(id)}` : `http://localhost:5000/tvseries/${Number(id)}`;
      //console.log(url);
        
        try {
        const response = await axios.get(url);
      //console.log(response);
        
        if (!response) {
            throw new Error('Network response was not ok');
        }
        const result = await response.data;
      //console.log(result);
        


        if (result) { // only set data if component is mounted
            if(category === 'movies'){
              //console.log(result);
                
                setItem(result);
                //setSimilarItems(result.similarMovies);
            }else if(category === 'tvseries'){
                //console.log(result.show);
                setItem(result);
                //setSeasons(result.seasons);
                //console.log(seasons);
                
            }
        }
        } catch (error) {
          //console.log(error);
        }
    };

    fetchData();

    },[id])
    

    // const item = {
    //     _id: 616037,
    //     backdrop_path: 'https://image.tmdb.org/t/p/original/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg',
    //     genres: [
    //         "Action & Adventure",
    //         "Comedy",
    //         "Romance"
    //     ],
    //     original_title: 'Thor: Love and Thunder',
    //     overview: 'After his retirement is interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods, Thor Odinson enlists the help of King Valkyrie, Korg, and ex-girlfriend Jane Foster, who now wields Mjolnir as the Mighty Thor.Together they embark upon a harrowing cosmic adventure to uncover the mystery of the God Butcher’s vengeance and stop him before it’s too late.',        
    //     poster_path: 'https://image.tmdb.org/t/p/original/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg',
    //     release_date: '2022-07-06',
    //     title: 'Thor: Love and Thunder',
    //     contentType: 'movie'
    // }

    const addToBookmarked = async (item) => {
        // e.preventDefault();

        const newItem = {
            userEmail: currentUser.email,
            data : item
        };
        // console.log(newItem);

        try {
            const response = await axios.post('http://localhost:5000/bookmarked', newItem);
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

    // const handleWatchTrailer = (item) => {
    //   //console.log(item);
        
    //     setModal(true);
    //     setLink(item.youtube_trailer)
    // }

    return (
        <div className='sm:m-24 m-4 sm:pt-16 pt-8 pb-8'>
      <AuthModal show={showModal} handleClose={handleCloseModal} />

        {/* {modal && <div>          
            <iframe src={link} height={"400px"} width={"500px"}/>         
        </div>} */}

        {item !== null ? <div className='h-[75vh] flex sm:flex-row flex-col box-border '>
            <div className="h-[90%] left sm:w-[38%] w-full flex justify-center items-center">
                <img className='sm:h-full h-[450px] sm:px-12 rounded-xl hover:-skew-y-3 hover:scale-110 hover:transition hover:duration-700 hover:ease-in-out duration-500 ease-in-out' src={item.poster_path} alt="" />
            </div>
            <div className="right sm:w-[62%] w-full flex flex-col sm:gap-4 gap-1 sm:mt-0 mt-6 pb-8">
                <h1 className='text-5xl text-white '>{item.original_title}</h1>
                <p className='text-gray-300 text-xl text-wrap mt-2'>{item.contentType[0].toUpperCase()+item.contentType.slice([1,])}</p>
                <h4 className='text-gray-400 text-xl sm:mt-4 mt-1'>Release Date : <span className='text-gray-200 text-xl'> {category === 'movies' ? item.release_date : item.first_aired}</span></h4>
                
                <div className='mt-4'>
                    <h4 className='text-white text-2xl sm:mb-4 mb-2'>Genres</h4>
                    {item.genres.map(genre => <div className='bg-white text-black font-semibold w-fit inline-block mr-4 rounded-md px-[10px] py-[2px]'>{genre}</div> )}
                </div>

                <h4 className='text-white text-2xl mt-4'>Synopsis</h4>
                <p className='text-gray-300 text-xl sm:text-wrap text-justify'>{item.overview}</p>
                
                <div className='flex gap-4'>

                <button className='mt-4 bg-blue-900 px-4 py-2 text-white rounded-lg w-fit'>
                        Watch Trailer Now
                </button>
                <button className='mt-4 bg-blue-900 px-4 py-2 text-white rounded-lg w-fit' onClick={()=>handleAddToBookmarked(item)}>
                <i className="fa-regular fa-bookmark fa-lg cursor-pointer" style={{ color: "#ffffff" }}></i>
                </button>
                </div>
            </div>
        </div> : 
        <FallbackPage />
        }

        {similarItems.length > 0 ? <div className="bottom mt-12 mx-8">
            <h1 className='text-gray-500 text-4xl'>
                Movies based on your Interest
            </h1>
            <div class="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
                similarItems.length && similarItems.map((item) => {
                    return (
                        <li>
                            <div className='relative card w-full sm:h-[280px] mr-4 rounded-lg'>
                                <div className='absolute top-2 right-4 w-[40px] h-[40px] rounded-full flex items-center justify-center backdrop-opacity-10 backdrop-invert bg-white/30'>
                                    <i className="fa-regular fa-bookmark fa-lg cursor-pointer" style={{ color: "#ffffff" }} onClick={() => addToBookmarked(item)}></i>
                                </div>
                                <img className='w-full h-[200px] object-cover rounded-lg' src={item.poster_path} alt="" />


                                <div className="absolute bottom-2 bg-transparent text-white p-2">
                                        <Link to={`/movie/${item._id}`}>
                                            <h2 className='text-xl'>{item.title}</h2>
                                        </Link>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
            </div>
        </div> : <div></div>
        }

        {seasons.length > 0 && <div className="bottom mt-12 mx-8">
            <h1 className='text-gray-500 text-4xl'>
                Watch season by season
            </h1>
            <div class="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {
                seasons.map((item) => {
                    return (
                        <li>
                            <div className='relative card w-full sm:h-[280px] mr-4 rounded-lg'>
                                <div className='absolute top-2 right-4 w-[40px] h-[40px] rounded-full flex items-center justify-center backdrop-opacity-10 backdrop-invert bg-white/30'>
                                    <i className="fa-regular fa-bookmark fa-lg cursor-pointer" style={{ color: "#ffffff" }} onClick={() => addToBookmarked(item)}></i>
                                </div>
                                <img className='w-full h-[170px] object-cover rounded-lg' src={item.episodes[0].thumbnail_path} alt="" />


                                <div className="bg-transparent text-white p-2">
                                        <Link to={`/movie/${item._id}`}>
                                            <h2 className='text-xl'>Season {item.season}</h2>
                                        </Link>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
            </div>
        </div>}
    </div>
    )
}

export default DetailsPage
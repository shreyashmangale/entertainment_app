import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import useFetch from 'fetch-suspense';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import AuthModal from '../Modal';

const FetchedTvseries = () => {
  const navigate = useNavigate()

  const { currentUser } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);


  const response = useFetch('http://localhost:5000/tvseries', { method: 'GET' });
  //console.log('The server responded with: ' + response);


  //   useEffect(()=>{
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch('http://localhost:5000/tvseries');
  //         if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //         }
  //         const result = await response.json();
  //         // console.log(result);


  //         if (result) { // only set data if component is mounted
  //           setSeries(result);
  //         }
  //       } catch (error) {
  //         //console.log(error);
  //       }
  //     };

  //     fetchData();

  //   },[])

  const addToBookmarked = async (item) => {
    // e.preventDefault();

    const newItem = {
      userEmail: currentUser.email,
      data: item
    };
    // console.log(newItem);

    try {
      const token = localStorage.getItem('access_token');

      const response = await axios.post('http://localhost:5000/bookmarked', newItem,{
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
    <div class="w-full">
      <AuthModal show={showModal} handleClose={handleCloseModal} />

      <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        {
          response.map((item) => {
            return (
              <li>
                <div className='relative card  w-full sm:h-[280px] h-[140px] rounded-lg bg-[#191f2f] shadow-lg' >

                  <div className='absolute top-2 right-4 w-[40px] h-[40px] rounded-full flex items-center justify-center backdrop-opacity-10 backdrop-invert bg-white/30' onClick={() => handleAddToBookmarked(item)}>
                    <i className="fa-regular fa-bookmark fa-lg cursor-pointer" style={{ color: "#ffffff" }} ></i>
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
          })
        }

      </div>
    </div>
  )
}

export default FetchedTvseries
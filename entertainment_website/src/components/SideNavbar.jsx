import React, { useCallback, useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faUser } from '@fortawesome/free-solid-svg-icons'


import { Dropdown } from 'antd';


const SideNavbar = () => {
    const navigate = useNavigate();

    const { currentUser, logout } = useContext(AuthContext);
    console.log(currentUser);

    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.pathname.split('/')[1]);
    //console.log(activeTab);

    const handleActiveTab = ((tabName) => {
        //setActiveTab(tabName)
    })

    useEffect(() => {
        console.log(activeTab);

    }, [activeTab])


    const handleLogout = async () => {
        await logout();
        navigate('/trending')
    }

    const items = [
        {
            label: <h1>{currentUser?.email}</h1>,
            key: '0',
        },
        {
            label: <div>
                {
                    currentUser ? <button onClick={logout}>Logout</button> : <button onClick={()=>navigate('/auth/login')}>Login / Sign Up</button>
                }
                </div>,
            key: '1',
        },
    ];

    return (
        <div className="lg:w-[100px] lg:h-[90vh] w-full h-[100px] rounded-xl bg-[#161D2F] lg:fixed lg:top-5 left-12 flex lg:flex-col lg:justify-around justify-between items-center">
            <div className="w-full h-full p-2 flex justify-around items-center h-full lg:flex-col">
                <div>
                    <img src={logo} alt="" />
                </div>

                <div className="lg:mt-20 flex lg:flex-col items-center sm:gap-16 gap-8 sm:scale-[100%] scale-[80%]">
                    <Link to='/trending'>
                        <i class="fa-brands fa-windows fa-xl cursor-pointer" style={{ color: activeTab === "" ? "#ffffff" : "#b4b4d2" }} onClick={() => handleActiveTab("trending")}>
                        </i>
                    </Link>
                    <Link to='/movies'>
                        <i class="fa-solid fa-film fa-xl cursor-pointer" style={{ color: activeTab === "movies" ? "#ffffff" : "#b4b4d2" }} onClick={() => handleActiveTab("movies")}>
                        </i>
                    </Link>
                    <Link to='/tvseries'>
                        <i class="fa-solid fa-tv fa-xl cursor-pointer" style={{ color: activeTab === "tvseries" ? "#ffffff" : "#b4b4d2" }} onClick={() => handleActiveTab("tvseries")}>
                        </i>
                    </Link>
                    <Link to='/bookmarked'>
                        <i class="fa-solid fa-bookmark fa-xl cursor-pointer" style={{ color: activeTab === "bookmarked" ? "#ffffff" : "#b4b4d2" }} onClick={() => handleActiveTab("bookmarked")}>
                        </i>
                    </Link>

                </div>


                <Dropdown menu={{ items }} trigger={"click"}>
                    <div className='flex flex-col justify-center items-center cursor-pointer'>
                        <div className='sm:w-[40px] w-[30px] sm:h-[40px] h-[30px] rounded-full bg-yellow-600 flex justify-center items-center'>
                            {currentUser ? 
                                <h1>
                                    {currentUser.username[0].toUpperCase()}
                                </h1> : <FontAwesomeIcon icon={faUser}/>
                            }
                        </div>
                        <h2 className='text-[#b4b4d2] text-lg font-bold'>
                            {currentUser?.username}
                        </h2>
                    </div>

                </Dropdown>

            </div>

        </div>
    )
}

export default SideNavbar
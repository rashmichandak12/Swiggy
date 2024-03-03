import React from 'react';
import { LOGO_URL } from '../utils/constants';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';
import { useSelector } from 'react-redux'; 

const Header = () => {
    const [btnName, setBtnName] = useState("Login");
    const onlineStatus = useOnlineStatus();

    const {loggedInUser} = useContext(UserContext);


    const cart = useSelector((store) => store.cart.items);
    return (
        <div className="flex justify-between shadow-lg bg-pink-200 sm:bg-gray-200">
            <div className="logo-container">
                <img 
                className="w-52"
                src={LOGO_URL}/>
            </div>
            <div className="nav-items flex items-center">
                <ul className='flex p-4 m-4'>
                    <li className='px-4'>Online Status: {onlineStatus ?  "✅" : "🔴"}</li>
                    <li className='px-4'><Link to="/">Home</Link></li>
                    <li className='px-4'><Link to="/contact">Contact</Link></li>
                    <li className='px-4'><Link to="/about">About Us</Link></li>
                    <li className='px-4 font-bold text-xl'><Link to="/cart">Cart ({cart.length} Items) </Link></li>
                    <button className='px-4' onClick={() => {
                       btnName === "Login" 
                       ? setBtnName("Logout")
                       : setBtnName("Login")
                       }}
                    >
                        {btnName}
                    </button>
                    <li>{loggedInUser}</li>
                </ul>
            </div>
        </div>
    )
}

export default Header;
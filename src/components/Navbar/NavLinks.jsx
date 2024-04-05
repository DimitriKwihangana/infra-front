import React from 'react';
import { HashLink } from 'react-router-hash-link';



const NavLinks = () => {

    const token = localStorage.getItem('token');
    const role =  localStorage.getItem('role');
   
    const handleClick = (event) => {
        if (!token) {
            alert('Please Login');
            event.preventDefault(); // Stop the default link behavior
            return;
        }
        // Continue with your navigation logic here
    };
    
    return (
        <>
              <HashLink className="px-4 font-extrabold text-gray-500 hover:text-blue-900 font-serif" smooth to="/report" onClick={handleClick}>
            Report
        </HashLink>
          {role ==="admin" ? ( <HashLink className="px-4 font-extrabold text-gray-500 hover:text-blue-900 font-serif" smooth to="/admin">
                Admin
            </HashLink>): null } 
         {!token? (<HashLink className="text-white bg-indigo-700 hover:bg-indigo-800 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl font-serif" smooth to="/login">
                Login
            </HashLink> ) :null }  
           {!token? (<HashLink className="text-white bg-indigo-700 hover:bg-indigo-800 inline-flex items-center justify-center w-auto px-6 py-3 shadow-xl rounded-xl font-serif" smooth to="/signup">
                SignUp
            </HashLink>):null} 
         {token? ( <HashLink className="px-4 font-extrabold text-gray-500 hover:text-blue-900 font-serif" smooth to="/profile">
                Profile
            </HashLink>):null}  
            
        
        </>
    )
}

export default NavLinks;

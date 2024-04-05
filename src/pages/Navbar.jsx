import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import { MdAccountCircle } from "react-icons/md";
const Navbar = () => {
  const [openModal,setOpenModal] = useState(false);
  const [scrolling, setScrolling] = useState(false)


const toogleModal = ()=>{
    setOpenModal(!openModal)
}
const handleScroll = () =>{
  if(window.scrollY > 0) {
    setTimeout(()=>{
      setScrolling(true);
    },1000)
  } else {
    setScrolling(false);
  }
};
useEffect(()=>{
  window.addEventListener("scroll", handleScroll);
  return()=>{
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
const navbarClass = scrolling ? "bg-whiteScroll " : "bg-whiteScroll ";
  return (
    <>
      <div
        className={`afriContainer  md:px-14 flex w-full font-serif  p-4 lg:px-20 justify-between items-center  ${navbarClass}`}
      >
        <div
          style={{ color: "#CB8342" }}
          className=" font-normal   text-xl italic"
        >
          <Link to='/'><p>AFRI ROOT</p></Link>
        </div>

        {/* navigation */}

        <div
          className="hidden lg:flex lg:space-x-4 font-normal  index font-serif"
          style={{ color: "#CB8342" }}
        >
          <Link to="/">
            <a href="" className="hover:underline px-2">
              Home
            </a>
          </Link>
          <Link to="/courses">
            <a href="" className="hover:underline px-2">
              Courses
            </a>
          </Link>

          <Link to="/history">
            <a href="" className="hover:underline px-2">
              Todays history
            </a>
          </Link>

          <Link to="/about">
            <a href="" className="hover:underline px-2">
              About Us
            </a>
          </Link>
          {token ? (
            <Link to="/profile">
              <MdAccountCircle size={32} className="mb-3 " />
            </Link>
          ) : (
            <Link to="/login">
              <button
                className="h-10 w-28 rounded-lg mt-[-1rem] "
                style={{ backgroundColor: "#A16733" }}
              >
                <a href="" className=" hover:underline  px-2">
                  Login
                </a>
              </button>
            </Link>
          )}
          {/* <Link to="signUp"> 
              <a href="" className="hover:underline px-2">
                signUp
              </a>
           </Link> */}
        </div>
        <div className="lg:hidden text-xl text-white " onClick={toogleModal}>
          <BiMenuAltRight
            style={{ backgroundColor: "#A16733" }}
            className=" w-10 h-10 rounded-full"
          />
        </div>
        {/* </div> */}
      </div>

      {/* navigation modal */}

      {openModal && <Modal />}
    </>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./Navbar/NavBar";
import axios from "axios";

const Profile = () => {
    const [loginData, setLoginData] = useState({})
    const id = localStorage.getItem('id');
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get(
              `http://127.0.0.1:3001/auth/user/${id}`
            );
            setLoginData(response.data.user)
            console.log(loginData)
          } catch (error) {
            console.error("Error fetching articles:", error);
          }
        };
        fetchUserData();
      }, [loginData]);
const navigate = useNavigate()
  // Sample user data

  const token = localStorage.getItem("token");

  // State variables
  const [name, setName] = useState();
  const [location, setLocation] = useState(loginData.location);
  const [phone, setPhone] = useState(loginData.phone);
  const [email, setEmail] = useState(loginData.email);
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();
    // Redirect to login page
  navigate('/')
  };

  // Function to handle edit
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to handle save
  
  console.log(id)
  const handleSave = async () => {
    try {
      
          const response = await axios.put(
              `http://127.0.0.1:3001/auth/update/${id}`,
              {
                location:location,
                name:name,
                phone:phone
              },
              
          );
         
          console.log(response);
          alert("the user is updated")
          setIsEditing(false);
      } catch (err) {
     
          console.log(err);
      }
  };

  return (
    <>
      <NavBar />
      <div className="bg-gray-100 h-[48rem] flex items-center justify-center ">
        <div className="bg-white p-8 rounded-md shadow-md max-w-2xl mx-auto w-1/2">
          {isEditing ? (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  className="border rounded-md p-2 w-full"
                  placeholder={loginData.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="border rounded-md p-2 w-full"
                  placeholder={loginData.location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="border rounded-md p-2 w-full"
                  placeholder={loginData.phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  className="border rounded-md p-2 w-full"
                  placeholder={loginData.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="text-white px-4 py-2 rounded-md bg-indigo-800"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-indigo-800">
                    {loginData.name}
                  </h1>
                  <p className="text-gray-500">{loginData.email}</p>
                </div>
              </div>
              <div className="mb-4">
                <strong>Name:</strong> {loginData.name}
              </div>
              <div className="mb-4">
                <strong>Location:</strong> {loginData.location}
              </div>
              <div className="mb-4">
                <strong>Phone:</strong> {loginData.phone}
              </div>
              <div className="flex justify-end">
                <button
                  className="text-white px-4 py-2 rounded-md bg-indigo-800"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <button
                  className="text-white px-4 py-2 rounded-md bg-indigo-500 mx-4"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            console.log('start')
            const response = await axios.post('https://infra-back.onrender.com/auth/login', {
                email,
                password
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', response.data.userdata.email)
            localStorage.setItem('id', response.data.userdata.id)
            localStorage.setItem('role', response.data.userdata.role)
            localStorage.setItem('userData', JSON.stringify(response.data.userdata));
            console.log(response)
            setLoading(false)
            navigate('/report')
           
        } catch (error) {
            // Handle login error
            console.error('Login failed:', error);
            toast.error('Login failed. Please check your credentials.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-20 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-200 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 w-full" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password:</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-200 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 w-full" />
                    </div>
                    <button type="submit" className="bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">{loading ? "loading" :"Login"}</button>
                </form>
            </div>
        </div>
    );
};

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone,setPhone] = useState(null)
    const [location, setLocation] = useState('')
   const navigate = useNavigate()
 

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://infra-back.onrender.com/auth/register', {
                name,
                email,
                password,
                phone,
                location,
                role:"user"
            });
            localStorage.setItem('token', response.data.token);
            // Redirect to dashboard or home page
            console.log(response)
            navigate("/login")
        } catch (error) {

            // Handle registration error
            console.error('Registration failed:', error);
            toast.error('Registration failed. Please try again later.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-20 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6">Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <div className="mb-2">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name:</label>
                        <input type="text" id="name" onChange={(e) => setName(e.target.value)} className="bg-gray-200 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 w-full" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email:</label>
                        <input type="email" id="email" v onChange={(e) => setEmail(e.target.value)} className="bg-gray-200 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 w-full" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password:</label>
                        <input type="password" id="password"  onChange={(e) => setPassword(e.target.value)} className="bg-gray-200 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 w-full" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone:</label>
                        <input type="number" id="password" onChange={(e) => setPhone(e.target.value)} className="bg-gray-200 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 w-full" />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Location:</label>
                        <input type="text" id="password" onChange={(e) => setLocation(e.target.value)} className="bg-gray-200 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 w-full" />
                    </div>
                    <button type="submit" className="bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export { LoginForm, SignUpForm };

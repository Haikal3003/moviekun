import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { registerUser } from '../../services/authService';

const RegisterPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password || !firstName || !lastName) {
        return;
      }

      await registerUser(email, password, firstName, lastName);
      navigate('/login');

      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 my-6">Moviekun</h1>
        <form className="w-full h-full space-y-8">
          <div>
            <label className="mb-5 font-semibold text-[1.1rem]">Firstname</label>
            <input type="text" placeholder="Enter your firstName..." value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-5 bg-gray-200 rounded-lg border-2 focus:border-gray-900" />
          </div>

          <div>
            <label className="mb-5 font-semibold text-[1.1rem]">Lastname</label>
            <input type="text" placeholder="Enter your lastName..." value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-5 bg-gray-200 rounded-lg border-2 focus:border-gray-900" />
          </div>

          <div>
            <label className="mb-5 font-semibold text-[1.1rem]">Email</label>
            <input type="text" placeholder="Enter your email..." value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-5 bg-gray-200 rounded-lg border-2 focus:border-gray-900" />
          </div>

          <div className="relative">
            <label className="mb-5 font-semibold text-[1.1rem]">Password</label>
            <input type={isShowPassword ? 'text' : 'password'} placeholder="Enter your password..." value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-5 bg-gray-200 rounded-lg focus:ring-gray-900" />
            {isShowPassword ? (
              <IoIosEye className="absolute right-5 text-[1.6rem] cursor-pointer top-[70%] -translate-y-[70%]" onClick={() => setIsShowPassword((prev) => !prev)} />
            ) : (
              <IoIosEyeOff className="absolute right-5 text-[1.6rem] cursor-pointer top-[70%] -translate-y-[70%]" onClick={() => setIsShowPassword((prev) => !prev)} />
            )}
          </div>

          <button type="button" className="w-full py-4 rounded-lg text-white bg-gray-900" onClick={handleRegister}>
            Register
          </button>

          <div className="flex justify-center items-center space-x-2">
            <span>Do you have an account? </span>
            <Link to={'/login'} className="text-blue-500">
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser, login} = useAuth();


  const navigate = useNavigate();
  

  useEffect(() => {
      if (currentUser) {
          navigate("/");
      }
  }, [currentUser, navigate]);

async function handleLogin(e) {
    e.preventDefault();

    try {
        setLoading(true);
        await login(username, password);
        navigate("/");
    } catch (e) {
        alert("Failed to login. ");
    }

    setLoading(false);
}

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-12 px-6 w-screen h-screen">
      <header>
        <div className="w-full h-auto">
          <div className="flex mx-auto w-full items-start">
            <a href="#" className="font-bold text-6xl mx-auto">
              <span className="text-[20px] font-bold mx-auto">WELCOME TO THE</span>
              <br />
              The Daily Bugle.
            </a>
          </div>
        </div>
      </header>
      <main className="items-center justify-between h-full w-screen items-center">
        <div className="bg-gray-800/10 p-10 rounded-lg shadow-xl w-full max-w-md mx-auto mt-[5rem]">
          <h3 className="text-xl font-semibold mb-5 text-center">Login</h3>
          <form id="loginForm" onSubmit={handleLogin}>
            <div className="mb-5">
              <label htmlFor="username" className="block mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-2 bg-gray-700 text-white rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 bg-gray-700 text-white rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full p-2 bg-blue-500 hover:bg-blue-700 rounded text-white">
              Login
            </button>
          </form>
          <div className="mt-5 text-center">
            <p>
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-500 hover:text-blue-700">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;

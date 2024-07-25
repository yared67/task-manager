import { useState } from 'react';
import { useCookies } from 'react-cookie';

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogIn, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  console.log(cookies);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();

    if (!isLogIn && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const response = await fetch(`http://localhost:4000/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie('Email', data.email);
      setCookie('AuthToken', data.token);
      window.location.reload();
    }

    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-md">
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')}>
          <h2 className="text-2xl font-bold text-center">
            {isLogIn ? 'Please login' : 'Please sign up!'}
          </h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
         
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogIn && 
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          } 

          <input
          
          type="submit"  className="w-full py-3 text-white bg-green-500 rounded-lg cursor-pointer hover:bg-green-600" onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')}
           
          />
          
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => viewLogin(false)}
            className={`px-4 py-2 font-semibold rounded-md ${!isLogIn ? 'bg-white text-green-600' : 'bg-gray-200 text-gray-600'}`}
          >
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            className={`px-4 py-2 font-semibold rounded-md ${isLogIn ? 'bg-white text-green-600' : 'bg-gray-200 text-gray-600'}`}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

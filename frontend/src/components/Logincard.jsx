import React, {useState} from 'react'

function Logincard() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
    }

  return (
      <div className="z-20 mt-10 lg:w-[35%] w-[80%] space-y-8 rounded-3xl bg-white p-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                required
                className="appearance-none rounded-lg bg-[#F4F6FC] relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none  relative block w-full bg-[#F4F6FC] mt-3 px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-end">          
              <a href="/" className="font-medium text-sm text-gray-600 hover:text-indigo-500">
                Forgot your password?
              </a>
          </div>
          <div className='flex justify-center'>
            <button
              type="submit"
              className="btn relative w-[35%] flex justify-center py-4 px-5   text-sm font-medium rounded-md "
            >
              Log In
            </button>
          </div>
        </form>
      </div>

  )
}

export default Logincard

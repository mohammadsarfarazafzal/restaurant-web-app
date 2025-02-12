import React from 'react'

function Login() {
  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-tr from-pink-500 to-violet-500'>
        <div className='w-full  max-w-sm bg-white rounded-lg shadow-lg p-5 '>
            <h2 className='font-bold text-2xl text-center mb-6 text-gray-800 font-serif'>Login</h2>
            <form action=''>
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-md font-bold text-gray-700'>
                        Email Address:
                    </label>
                    <input type="email" id='email'
                    className='mt-1 w-full px-2  py-1 border rounded-md text-gray-800 focus:ring-2 focus:ring-pink-700 focus:outline-none'
                    placeholder='Enter you email' />
                </div>

                {/* Password feild */}

                <div>
                    <label htmlFor="password" className='block text-md font-bold text-gray-700'>
                        Password
                    </label>
                    <input type="password" id='password'
                    className='mt-1 w-full px-2  py-1 border rounded-md text-gray-800 focus:ring-2 focus:ring-pink-700 focus:outline-none'
                    placeholder='Password' />
                </div>
                <button type='submit'
                className='w-full bg-gradient-to-tr from-pink-700 to-violet-500 text-white font-bold py-2 rounded-md 
        hover:bg-blue-600 focus:ring-2 focus:ring-pink-500 focus:outline-none mt-4'>Login</button>
            </form>
            <p className='text-sm text-center text-gray-700 mt-4'>Don't have a account ? <a href="#" className='text-blue-800 font-medium hover:underline'>Register now</a></p>
        </div>
    </div>
  )
}

export default Login
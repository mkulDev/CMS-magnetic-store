import { useState } from 'react'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigatate = useNavigate()

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        navigatate('/cpanel')
      })
      .catch((error) => {
        const errorMessage = error.message
        console.log(errorMessage)
      })

    setEmail('')
    setPassword('')
  }
  const isValidEmail = (email: string) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    return emailRegex.test(email)
  }

  const isDisabled = !(isValidEmail(email) && password && password.length >= 6)

  return (
    <div className='flex justify-center h-[calc(100vh-80px)] items-center'>
      <form
        onSubmit={handleSignIn}
        className=' py-8 px-10  flex flex-col rounded-xl md:w-[500px] sm:w-[250px]  bg-gray-100 shadow-lg border-t-2 '
      >
        <h2 className='font-bold text-xl m-4 self-center'>
          Login to <span className='text-blue-500'>Control Panel</span>
        </h2>
        <label
          htmlFor='email'
          className='pl-2'
        >
          E-mail adress:
        </label>
        <input
          onChange={handleEmailChange}
          type='email'
          placeholder='E-mail'
          name='email'
          value={email}
          className='px-6 py-2 mb-2 rounded-md bg-gray-200 focus:outline-none'
        />
        <label
          htmlFor='pass'
          className='pl-2'
        >
          Authoriztion code:
        </label>
        <input
          onChange={handlePassChange}
          type='password'
          placeholder='Password'
          name='pass'
          value={password}
          className='px-6 py-2 mb-2 rounded-md bg-gray-200 focus:outline-none'
        />
        <button
          type='submit'
          disabled={isDisabled}
          className={`px-6 py-2 m-4 ${isDisabled ? 'bg-gray-400' : 'bg-blue-500'} rounded-lg text-white hover:opacity-60 duration-500 w-[150px] self-center`}
        >
          {' '}
          Sign in
        </button>
      </form>
    </div>
  )
}

export default Login

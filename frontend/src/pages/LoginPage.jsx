import { useState } from 'react'
import { useNavigate, Link, redirect } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'

export default function LoginPage() {
  const [message, setMessage] = useState(null)
  const [formData, setFormData] = useState({
    "email": '',
    "password": ''
  })
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const response = await fetch(`http://localhost:8080/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        "email": formData.email,
        "password": formData.password
      })
    })


    if (response.ok) {
      alert("LOGIN SUCCESSFUL!")
      navigate("/")
    }
    else {
      setMessage("INVALID LOGIN!")
    }
  }

  const handleChange = (e) => {

    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setMessage("")
  };

  return (
    <>
      <NavigationBar />
      <div className='mx-auto max-w-sm h-200 content-center'>
        <form onSubmit={handleSubmit} className='[&>input]:bg-white [&>input]:text-black *:my-2 flex flex-col'>
          <h1 className='text-3xl font-extrabold text-center'>LOGIN</h1>
          <input type='email' value={formData.email} onChange={handleChange} name='email' />
          <input type='password' value={formData.password} onChange={handleChange} name='password' />
          <input type='submit' value="LOGIN" />
        </form>
        {message != null && <p className='text-center mt-8'>{message}</p>}
      </div>
    </>
  )
}

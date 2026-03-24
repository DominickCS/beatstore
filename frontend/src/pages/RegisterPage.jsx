import { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import { toast, Bounce, ToastContainer } from "react-toastify";

export default function RegisterPage() {
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    "fullName": '',
    "email": '',
    "password": ''
  })
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const response = await fetch(`http://localhost:8080/auth/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
        "fullName": formData.fullName,
        "email": formData.email,
        "password": formData.password
      })
    })

    const displayToast = async () => {
      toast(<p className="font-extrabold text-center text-md">{await response.text()}</p>, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }

    displayToast()

    if (response.ok) {
      setTimeout(() => { navigate("/") }, 6000)
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
      <ToastContainer />
      <div className='mx-auto max-w-sm h-200 content-center'>
        <form onSubmit={handleSubmit} className='[&>input]:bg-white [&>input]:text-black *:my-2 flex flex-col'>
          <h1 className='text-3xl font-extrabold text-center'>REGISTER</h1>
          <label htmlFor="fullName">Full Name</label>
          <input type="text" value={formData.fullName} onChange={handleChange} name="fullName" />
          <label htmlFor="email">Email Address</label>
          <input type='email' value={formData.email} onChange={handleChange} name='email' />
          <label htmlFor="password">Password</label>
          <input type='password' value={formData.password} onChange={handleChange} name='password' />
          <input type='submit' value="REGISTER" />
        </form>
        {message != null && <p className='text-center mt-8'>{message}</p>}
      </div>
    </>
  )
}

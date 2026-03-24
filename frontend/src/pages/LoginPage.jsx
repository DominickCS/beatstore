import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import api from '../api/axiosInstance';


export default function LoginPage() {
  const [formData, setFormData] = useState({
    "email": '',
    "password": ''
  })
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post('/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);

      toast.success(<p className="font-extrabold text-center text-lg">{response.data.message}</p>, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });

      setTimeout(() => navigate("/"), 6000);

    } catch (err) {

      toast.error(<p className="font-extrabold text-center text-lg">{err.response.data.message}</p>, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    }
  }

  const handleChange = (e) => {

    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <ToastContainer />
      <NavigationBar />
      <div className='mx-auto max-w-sm h-200 content-center'>
        <form onSubmit={handleSubmit} className='[&>input]:bg-white [&>input]:text-black *:my-2 flex flex-col'>
          <h1 className='text-3xl font-extrabold text-center'>LOGIN</h1>
          <input type='email' value={formData.email} onChange={handleChange} name='email' />
          <input type='password' value={formData.password} onChange={handleChange} name='password' />
          <input type='submit' value="LOGIN" />
        </form>
      </div>
    </>
  )
}

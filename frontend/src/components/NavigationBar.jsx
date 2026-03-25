import Modal from 'react-modal'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import api from '../api/axiosInstance';

export default function NavigationBar() {
  const { user, logout } = useAuth();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({
    description: '',
    title: '',
    price: '',
    bpm: ''
  })

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleSubmit(e) {
    setErrors('')
    e.preventDefault();
    const form = e.target;

    const formData = new FormData();
    formData.append('beatFile', form.beatUpload.files[0]);
    formData.append('coverartFile', form.coverartUpload.files[0]);
    formData.append('uploadRequest', new Blob([JSON.stringify({
      title: form.beatTitle.value,
      description: form.beatDescription.value,
      price: form.beatPrice.value,
      bpm: parseInt(form.beatBPM.value),
      tags: form.beatTags.value.split(',').map(t => t.trim()) // Separate Tags with commas between each tag
    })], { type: 'application/json' }));

    try {
      const response = await api.post('/api/beats/upload', formData, {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      });

      toast.success(<p className="font-extrabold text-center text-lg">{response.data}</p>, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });

      closeModal()

    } catch (err) {

      setErrors(prev => ({ ...prev, ...err.response.data }))
    }
  }

  return (
    <div className='py-8'>
      <ToastContainer />
      <nav className='flex text-center items-center'>
        <div className='flex-3'>
          <h1 className='hover:tracking-widest transition-all duration-500 hover:scale-110 font-extrabold text-4xl text-shadow-white/40 text-shadow-lg'><Link to={'/'}>Y2KDOM</Link></h1>
        </div>
        <div className='flex flex-2 justify-evenly'>
          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              <button className="hover:cursor-pointer" onClick={logout}>Logout</button>
              {user.roles?.includes('ROLE_ADMIN') && (
                <button className="hover:cursor-pointer" onClick={() => openModal()}>+</button>
              )}
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
      <Modal
        className={"bg-black/90 text-white flex items-center content-center flex-col m-8 min-h-fit py-8"}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <form className='flex flex-col *:py-3 [&>input]:border [&>input]:text-center [&>input]:px-4 [&>label]:text-center [&>p]:font-extrabold [&>p]:text-red-400 text-center' onSubmit={handleSubmit}>
          <label htmlFor='beatUpload'>File Upload</label>
          <input type='file' name='beatUpload' />
          <label htmlFor='coverartUpload'>Cover Art</label>
          <input type='file' name='coverartUpload' />
          <label htmlFor='beatTitle'>Title</label>
          <input type='text' name='beatTitle' />
          {errors.title && <p>{errors.title}</p>}
          <label htmlFor='beatDescription'>Description</label>
          <input type='text' name='beatDescription' />
          {errors.description && <p>{errors.description}</p>}
          <label htmlFor='beatPrice'>Price</label>
          <input type='text' name='beatPrice' />
          {errors.price && <p>{errors.price}</p>}
          <label htmlFor='beatBPM'>BPM</label>
          <input type='number' name='beatBPM' />
          {errors.bpm && <p>{errors.bpm}</p>}
          <label htmlFor='beatTags'>Tags</label>
          <input type='text' name='beatTags' />
          <input className='mt-8' type='submit' value={"Add Beat"} />
        </form>
      </Modal>
    </div>
  )
}

import NavigationBar from "../components/NavigationBar";
import api from '../api/axiosInstance';
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function ListingCreationPage() {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({
    description: '',
    title: '',
    price: '',
    bpm: ''
  })

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
      const response = await api.post('/api/admin/beats/upload', formData, {
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

      setTimeout(() => navigate("/admin"), 3000);

    } catch (err) {
      setErrors(prev => ({ ...prev, ...err.response.data }))
    }
  }
  return (
    <>
      <ToastContainer />
      <NavigationBar />
      <div className="max-w-md mx-auto px-8">
        <form className='mt-24 flex flex-col *:py-3 [&>input]:border [&>input]:text-center [&>input]:px-4 [&>label]:text-center [&>p]:font-extrabold [&>p]:text-red-400 text-center' onSubmit={handleSubmit}>
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
          <input
            type='text'
            name='beatPrice'
            maxLength={6}
            onKeyDown={e => {
              const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']
              if (allowed.includes(e.key)) return
              if (!/[\d.]/.test(e.key)) { e.preventDefault(); return }
              if (e.key === '.' && e.target.value.includes('.')) e.preventDefault()
            }}
          />
          {errors.price && <p>{errors.price}</p>}
          <label htmlFor='beatBPM'>BPM</label>
          <input type='number' name='beatBPM' />
          {errors.bpm && <p>{errors.bpm}</p>}
          <label htmlFor='beatTags'>Tags</label>
          <input type='text' name='beatTags' />
          <input className='mt-8' type='submit' value={"Add Beat"} />
        </form>
      </div>
    </>
  )
}

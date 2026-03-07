import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import StoreFront from './StoreFront.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-black/90 text-white pt-4'>
      <h1 className='text-4xl text-center font-extrabold text-shadow-lg text-shadow-gray-400'>Y2KDOM</h1>
      <StoreFront />
    </div>
  </StrictMode>,
)

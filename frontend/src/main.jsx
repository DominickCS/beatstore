import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import StoreFront from './StoreFront.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-black/90 text-white'>
      <StoreFront />
    </div>
  </StrictMode>,
)

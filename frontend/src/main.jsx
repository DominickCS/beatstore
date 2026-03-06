import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StoreFront from './StoreFront.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreFront />
  </StrictMode>,
)

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    // fetch /auth/login here
    // on success navigate('/')
  }

  return (
    <>
      <NavigationBar />
      LOGIN
    </>
  )
}

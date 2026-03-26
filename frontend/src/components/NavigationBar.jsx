import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

export default function NavigationBar() {
  const { user, logout } = useAuth();
  return (
    <div className='py-8'>
      <nav className='flex text-center items-center'>
        <div className='flex-3'>
          <h1 className='hover:tracking-widest transition-all duration-500 hover:scale-110 font-extrabold text-4xl text-shadow-white/40 text-shadow-lg'><Link to={'/'}>Y2KDOM</Link></h1>
        </div>
        <div className='flex flex-2 justify-evenly'>
          {user ? (
            <>
              {user.roles?.includes('ROLE_ADMIN') && (
                <Link className='transition-all hover:scale-110 hover:tracking-widest duration-500' to="/admin">Creator Dashboard</Link>
              )}
              <Link className='transition-all hover:scale-110 hover:tracking-widest duration-500' to="/profile">Profile</Link>
              <button className='transition-all hover:scale-110 hover:tracking-widest duration-500 hover:cursor-pointer' onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link className='transition-all hover:scale-110 hover:tracking-widest duration-500' to="/login">Login</Link>
              <Link className='transition-all hover:scale-110 hover:tracking-widest duration-500' to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}

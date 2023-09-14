import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";


const Navbar = () => {
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate()

  return(
    <nav className="navbar bg-secondary">
      <span className="navbar-brand mb-0 h1">The Sanders Household Inventory</span>
      <div className="header" padding='20px'>


        {user ?
          <div className='container'>
            <button className="container" onClick={() => setUser()}>Signout</button>
            <span style={{ fontWeight: 'bold' }}>
            Logged in as: {user.first_name} {user.last_name}, User ID: {user.id}
            </span>
          </div>
        :
          <>
            <button className="button" onClick={() => navigate('/signin')}>Login</button>
            <button className="button" onClick={() => navigate('/signup')}>Sign Up</button>
          </>
        }
      </div>

    </nav>
  )
}

export default Navbar
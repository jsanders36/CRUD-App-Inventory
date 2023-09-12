import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";


const Navbar = () => {
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate()

  return(
    <nav className="navbar bg-secondary">
      <span className="navbar-brand mb-0 h1">The Sanders Household Inventory</span>
      <div className="links mx-5">


        {user ?
          <>
            <button className="btn btn-danger" onClick={() => setUser()}>Signout</button>
            Logged in as: {user.first_name}
          </>
        :
          <>
            <button className="btn btn-primary" onClick={() => navigate('/signin')}>Login</button>
            <button className="btn btn-info mx-3" onClick={() => navigate('/signup')}>Sign Up</button>
          </>
        }
      </div>

    </nav>
  )
}

export default Navbar
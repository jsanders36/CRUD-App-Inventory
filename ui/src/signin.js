import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";

const Signin = () => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext)
  const [failedLogin, setFailedLogin] = useState(false)

  const handleSignin = (e) => {
    e.preventDefault();
    let user = { username: e.target[0].value, password: e.target[1].value };

    fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
    .then((data) => data.json())
    .then((res) => {
      console.log('user:', res);
      if(res.id){
        setUser(res)
        navigate('/')
      }
      else{
        setFailedLogin(true)
      }
    });
  };

  return (
    <div style={{height: "100vh"}} className="header">
      <h3 className="text-center text-light">Enter your info:</h3>
      {failedLogin ? (<h3 className="text-center text-danger">FAILED LOGIN</h3>) : (<></>)}
      <form className="mt-5 d-flex justify-content-center align-items-center" onSubmit={(e) => handleSignin(e)}>
        <input className="input" type="text" placeholder="User Name" required/>
        <input className="input" type="password" placeholder="Password" required/>
        <input className="input" type="submit"/>
      </form>
    </div>
  )
};

export default Signin;
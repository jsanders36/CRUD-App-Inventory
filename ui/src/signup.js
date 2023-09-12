import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'

const Signup = () => {
  const navigate = useNavigate()
  const [displayModal, setDisplayModal] = useState(false)

  const handleSignup = (e) => {
    e.preventDefault();
    let user = {first_name: e.target[0].value, last_name: e.target[1].value, username: e.target[2].value, password: e.target[3].value}

    fetch('http://localhost:8080/signup', {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(user)
    })
    .then(data => data.json())
    .then(res => {
      console.log("response", res)
      setDisplayModal(true)
    })
  }

  return (
  <div style={{height: "100vh"}} className="bg-dark">
    <h3 className="text-center text-light">Enter your info:</h3>
    <form className="mt-5 d-flex justify-content-center align-items-center" onSubmit={(e) => handleSignup(e)}>

      <input type="text" placeholder="First Name" required/>
      <input type="text" placeholder="Last Name" required/>
      <input type="text" placeholder="User Name" required/>
      <input type="password" placeholder="Password" required/>
      <input type="submit"/>
    </form>

    <Modal show={displayModal} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Account created successfully!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You may now click the button below to take you to the login page.
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={() => {navigate('/signin')}}>
          To Signin
        </button>
      </Modal.Footer>
    </Modal>
  </div>
  )
};

export default Signup;
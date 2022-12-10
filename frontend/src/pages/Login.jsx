import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const {email, username, display_name, password, password2} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
    <section className="heading">
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p>Login and start posting!</p>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
        <input type="text" className="form-control" id="username" name="username" value={username} placeholder='Enter username' onChange={onChange}/>
        </div>
        <div className="form-group">
        <input type="text" className="form-control" id="password" name="password" value={password} placeholder='Enter password' onChange={onChange}/>
        </div>
        <div className="form-group">
          <button type="submit" className='btn btn-block'>Submit</button>
        </div>
      </form>
    </section>
    </>
  )
}

export default Login
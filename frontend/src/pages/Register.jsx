import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    display_name: '',
    profile_image: null,
    password: '',
    password2: ''
  })

  const {email, username, display_name, profile_image, password, password2} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth) 

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        email, username, display_name, password,
      }

      dispatch(register(userData))
    }
  }

  const fileSelectedHandler = e => {
    setFormData({profile_image: e.target.files[0].name})
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
    <section className="heading">
      <h1>
        <FaUser /> Register
      </h1>
      <p>Please create an account</p>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
        <input type="text" className="form-control" id="email" name="email" value={email} placeholder='Enter email' onChange={onChange}/>
        </div>
        <div className="form-group">
        <input type="text" className="form-control" id="username" name="username" value={username} placeholder='Enter username' onChange={onChange}/>
        </div>
        <div className="form-group">
        <input type="text" className="form-control" id="display_name" name="display_name" value={display_name} placeholder='Enter display name' onChange={onChange}/>
        </div>
        <div className="form-group">
        <input type="file" className="form-control" id="profile_image" name="profile_image" value={profile_image} placeholder='Upload profile image' onChange={fileSelectedHandler}/>
        </div>
        <div className="form-group">
        <input type="password" className="form-control" id="password" name="password" value={password} placeholder='Enter password' onChange={onChange}/>
        </div>
        <div className="form-group">
        <input type="password" className="form-control" id="password2" name="password2" value={password2} placeholder='Confirm password' onChange={onChange}/>
        </div>
        <div className="form-group">
          <button type="submit" className='btn btn-block'>Register</button>
        </div>
      </form>
    </section>
    </>
  )
}

export default Register
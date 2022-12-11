import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaReact } from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

function Footer() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <footer className='footer'>
            <ul>
                <li>
                    <Link to='google.com'>
                        <FaTwitter/>
                    </Link>
                </li>
                <li>
                    <Link to='google.com'>
                        <FaFacebook/>
                    </Link>
                </li>
                <li>
                    <Link to='google.com'>
                        <FaInstagram/>
                    </Link>
                </li>
                <li>
                    <Link to='google.com'>
                        <FaLinkedin/>
                    </Link>
                </li>
            </ul>
        </footer>
    )
}

export default Footer
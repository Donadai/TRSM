import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import {Link} from 'react-router-dom'

function Footer() {
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
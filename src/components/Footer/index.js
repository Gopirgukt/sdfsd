import {FaGoogle, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="FooterContainer">
    <div className="iconsContainer">
      <FaGoogle size={20} color="#ffffff" />
      <FaTwitter size={20} color="#ffffff" />
      <FaInstagram size={20} color="#ffffff" />
      <FaYoutube size={20} color="#ffffff" />
    </div>
    <p className="text-footer">Contact us</p>
  </div>
)
export default Footer

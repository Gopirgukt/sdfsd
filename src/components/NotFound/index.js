import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="NotFoundContainer">
    <h1 className="NotFound-Main-Heading">Lost Your Way ?</h1>
    <p className="NotFound-Description">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="HomeButton">
        Go to Home
      </button>
    </Link>
  </div>
)
export default NotFound

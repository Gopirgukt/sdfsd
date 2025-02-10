import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import ReactContext from '../../context/ReactContext'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => (
  <ReactContext.Consumer>
    {value => {
      const {username, password} = value

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <div className="AccountContainer">
          <Header />
          <div className="AccountBodyContainer">
            <div className="AccountDetailsSection">
              <h1>Account</h1>
              <hr />
              <div className="MemberShipContainer">
                <p>Member ship</p>
                <div className="Userdetails">
                  <p>{username}</p>
                  <p>Password: {'*'.repeat(password.length)}</p>
                </div>
              </div>
              <hr />
              <div className="PlanDetails">
                <p>Plan details</p>
                <p className="premium">Premium</p>
                <p>Ultra HD</p>
              </div>
              <hr />
              <div className="LogoutButtonDiv">
                <button
                  type="button"
                  className="LogoutButton"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )
    }}
  </ReactContext.Consumer>
)
export default withRouter(Account)

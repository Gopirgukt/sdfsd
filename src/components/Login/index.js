import {useState} from 'react'
import Cookies from 'js-cookie'
import ReactContext from '../../context/ReactContext'
import './index.css'

const Login = props => {
  const [errorMsg, setErrorMsg] = useState('')
  return (
    <ReactContext.Consumer>
      {value => {
        const {
          username,
          password,
          onChangeInput,
          onChangePassword,
          setusername,
          setPassword,
        } = value

        const onSubmitSuccess = jwtToken => {
          const {history} = props
          Cookies.set('jwt_token', jwtToken, {expires: 30})
          history.replace('/')
        }

        const onClickLoginButton = async event => {
          event.preventDefault()
          const url = 'https://apis.ccbp.in/login'
          const userDetails = {username, password}
          const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
          }
          const response = await fetch(url, options)
          // console.log(response.ok)
          const data = await response.json()
          if (response.ok) {
            onSubmitSuccess(data.jwt_token)
          } else {
            setErrorMsg(data.error_msg)
            setusername('')
            setPassword('')
          }
        }
        return (
          <div className="LoginContainer">
            <div className="LoginHeader">
              <img
                src="https://res.cloudinary.com/dfgdjrtc1/image/upload/v1734851396/Group_7399_v9hdrd.png"
                alt="login website logo"
                className="LoginLogo"
              />
            </div>
            <div className="LoginBody">
              <div className="FormContainer">
                <h1 className="form-main-heading">Login</h1>
                <form className="login-form" onSubmit={onClickLoginButton}>
                  <label htmlFor="username">USERNAME</label>
                  <input
                    type="text"
                    id="username"
                    className="input"
                    placeholder="Enter the Username"
                    value={username}
                    onChange={onChangeInput}
                  />
                  <label htmlFor="password">PASSWORD</label>
                  <input
                    type="password"
                    id="password"
                    className="password"
                    placeholder="Enter the Password"
                    value={password}
                    onChange={onChangePassword}
                  />
                  <p className="errorMsg">{errorMsg}</p>
                  <button type="submit" className="LoginButton">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        )
      }}
    </ReactContext.Consumer>
  )
}
export default Login

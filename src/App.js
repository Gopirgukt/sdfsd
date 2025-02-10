import {useState} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import Search from './components/Search'
import Account from './components/Account'
import NotFound from './components/NotFound'
import PotectiveRoute from './components/ProtectiveRoute'
import MovieItemDetails from './components/MovieItemDetails'
import ReactContext from './context/ReactContext'
import './App.css'

const App = () => {
  const [username, setusername] = useState('')
  const [password, setPassword] = useState('')

  const onChangeInput = event => {
    setusername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  return (
    <ReactContext.Provider
      value={{
        username,
        password,
        onChangeInput,
        onChangePassword,
        setusername,
        setPassword,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <PotectiveRoute exact path="/" component={Home} />
        <PotectiveRoute exact path="/popular" component={Popular} />
        <PotectiveRoute exact path="/search" component={Search} />
        <PotectiveRoute exact path="/account" component={Account} />
        <PotectiveRoute exact path="/movies/:id" component={MovieItemDetails} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </ReactContext.Provider>
  )
}

export default App

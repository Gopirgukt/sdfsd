import React from 'react'

const ReactContext = React.createContext({
  username: '',
  password: '',
  onChangeInput: () => {},
  onChangePassword: () => {},
})
export default ReactContext

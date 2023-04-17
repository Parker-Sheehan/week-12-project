import { Routes, Route, Navigate } from 'react-router-dom'
import {useContext} from 'react'
import AuthContext from './store/authContext'
import './App.css'

import Header from './components/Header'
import Home from './components/Home'
import Auth from './components/Auth'
import Form from './components/Form'
import Profile from './components/Profile'

const App = () => {
  const {token, exp} = useContext(AuthContext)

  return (
    <div className='app'>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={!token?<Auth/>:<Navigate to='/'/>}/>
        <Route path='/form' element={token?<Form/>: <Navigate to='/auth'/>}/>
        <Route path='/profile' element={token?<Profile/>: <Navigate to='/auth'/>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </div>
  )
}

export default App
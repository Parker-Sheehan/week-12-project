import {useState, useContext} from 'react'
import AuthContext from '../store/authContext'
import axios from 'axios'
 
const Auth = () => {
    let {login} = useContext(AuthContext)

   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)

   const passwordChangeHandler = (event) => {
    setPassword(event.target.value)
   }

   const usernameChangeHandler = (event) => {
    setUsername(event.target.value)
   }

   const registarChangeHandler = () => {
    setRegister(!register)
   }
 
   const submitHandler = e => {
       e.preventDefault()

       const bodyObj = {
        username: username,
        password: password
       }

       let requestLocation = register? '/register':'/login'

       axios.post(`${requestLocation}`, bodyObj)
            .then(({data}) => {
                console.log(data)
                login(data.token, data.exp, data.userId)
            })
            .catch(res => alert('error error'))
 
       console.log('submitHandler called')
   }
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                    onChange={usernameChangeHandler}
                    value={username}
                    type='text'
                    placeholder='username'
                    className='form-input'/>
               <input
                    onChange={passwordChangeHandler}
                    value={password}
                    type='password'
                    placeholder='password'
                    className='form-input'/>
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button className='form-btn' onClick={registarChangeHandler}>Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
   )
}
 
export default Auth
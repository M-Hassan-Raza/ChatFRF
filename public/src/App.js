import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import SetAvatar from './pages/SetAvatar'
import Call from './components/Call'
import AudioCall from './components/AudioCall'
export default function App()
{
  return(
    <BrowserRouter>
    <Routes>
      <Route path = "/register" element = {<Register/>}/>
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/setAvatar" element = {<SetAvatar/>}/>
      <Route path = "/" element = {<Chat/>}/>
      <Route path = "/call" element = {<Call/>} />
      <Route path = '/audiocall' element = {<AudioCall/>} />
    </Routes>
    </BrowserRouter>
  )
}
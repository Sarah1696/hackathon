import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './vues/home'
import Login from './vues/login'
import Register from './vues/register'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App

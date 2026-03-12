import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from  './components/Login'
import Todo from './components/Todo'
import Navbar from './components/Navbar'
import AllTodo from './components/AllTodo'
import Update from './components/Update'
import Register from './components/Register'

function App() {
  return (
 <>
 <Navbar />
 <Routes>
  <Route path='/home' element={<Home/>} />
  <Route  path='/login'  element={<Login/>} />
  <Route  path='/todo' element={<Todo/>} />
  <Route path='/' element={<AllTodo/>} />
  <Route path='/update/:id' element={<Update/>} />
  <Route path='/register' element={<Register/>} />
 </Routes>
 </>
  )
}

export default App

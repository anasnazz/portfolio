import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Projects from './pages/projects/Projects'
import Contact from './pages/contact/Contact'

function RoutesComp() {
  return (
    <Routes>
        <Route path='/' element={<Home />}></Route>
      <Route path='/projects' element={<Projects />}></Route>
      <Route path='/contact' element={<Contact />}></Route>
    </Routes>
  )
}

export default RoutesComp
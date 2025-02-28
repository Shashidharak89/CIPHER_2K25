import React,{ useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Footer from './components/footer'


function App() {
  

  return (
    <div>
      <Navbar/>
      {/* <Sidebar/> */}
      <Home/>
      <Footer/>
    </div>
  )
}

export default App

import React from 'react'
import {Navbar,Footer} from './Components'
import {Outlet} from 'react-router-dom'


function Layout() {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Layout
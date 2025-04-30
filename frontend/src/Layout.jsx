import React from 'react'
import {Navbar,Footer} from './Components'
import {Outlet} from 'react-router-dom'
import HeadRoom from 'react-headroom'

function Layout() {
  return (
    <>
        <HeadRoom><Navbar/></HeadRoom>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Layout
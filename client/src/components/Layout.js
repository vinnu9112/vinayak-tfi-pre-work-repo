import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { Toaster } from 'react-hot-toast'

const Layout = ({children}) => {
  return (
    <>
    <Header/>
      <div style={{height: '80vh'}}>
        <Toaster />
        {children}</div>
    <Footer/>
    </>
  )
}

export default Layout

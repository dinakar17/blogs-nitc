import React from 'react'
import Footer from './Footer/Footer'
import Header from './Header/Header'

// Type of children
type Props = {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <>
    <Header/>
    <div>{children}</div>
    <Footer/>
    </>
  )
}

export default Layout
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
    <div className='font-default'>
    <Header/>
    <div>{children}</div>
    <Footer/>
    </div>
    </>
  )
}

export default Layout
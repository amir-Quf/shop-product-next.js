import React from 'react'
import Nav from './navigation/Nav'

const Layout = ({children} : {children : React.ReactNode}) => {
  return (
    <main>
        <Nav/>
      {children}
    </main>
  )
}

export default Layout

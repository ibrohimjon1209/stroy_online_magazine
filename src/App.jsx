import React, { useState } from 'react'
import Language from './Pages/Enter/Language'
import Region from './Pages/Enter/Region'
import Borrow from './Pages/Enter/Borrow'
import Category from './Pages/Enter/Category'
import Navbar from './Pages/Navbar/Navbar'
import Home from './Pages/Home/Home'

const App = () => {

  const User_sign_in = useState([false])


  return (
    <div className='w-[375px] sm:w-[1440px] m-auto'>
      <Navbar />

      <Language />
      <Region />
      <Borrow />
      <Category />

      <div>
        <Home />

      </div>
    </div>
  )
}

export default App
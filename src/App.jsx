import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './Pages/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Likes from './Pages/Navbar/chields/likes/likes_main';
import Basket from './Pages/Navbar/chields/basket/basket_main';
import Orders from './Pages/Navbar/chields/orders/orders_main';
import Profile from './Pages/Navbar/chields/profile/profile';

const App = () => {
  const [userSignIn, setUserSignIn] = useState(false);

  return (
    <Router>
      <div className='w-[375px] sm:w-[1440px] m-auto'>
        <Navbar />
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/likes' element={<Likes />} />
            <Route path='/basket' element={<Basket />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
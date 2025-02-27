import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Pages/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Likes from "./Pages/Navbar/chields/likes/likes_main";
import Basket from "./Pages/Navbar/chields/basket/basket_main";
import Orders from "./Pages/Navbar/chields/orders/orders_main";
import Profile from "./Pages/Navbar/chields/profile/profile";
import Not_found from "./Pages/Not_found/not_found";
import InternetChecker from "./Pages/offline_page/offline_page";

const App = () => {
  const [userSignIn, setUserSignIn] = useState(false);
  const [is_found, set_is_found] = useState(true);

  return (
    <Router>
      <div className={`${is_found ? "w-[375px] sm:w-[1440px]" : "w-full"} m-auto`}>
        <InternetChecker />
        {is_found ? <Navbar /> : ""}
        <Routes>
          <Route path="/*" element={<Not_found set_is_found={set_is_found} />} />
          <Route path="/" element={<Home />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

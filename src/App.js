import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar';
import Home from './Pages/PLP';
import ProductDetails from './Pages/PDP';
import Cart from './Pages/Cart';


class App extends Component {


  render() {
    return (
      <Router>
        <Navbar/>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>
        </Routes>
        
      </Router>

    )
  }
}


export default App;

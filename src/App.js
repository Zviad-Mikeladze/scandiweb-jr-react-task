import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar';
import PLP from './Pages/PLP';
import PDP from './Pages/PDP';
import Cart from './Pages/Cart';


class App extends Component {


  render() {
    return (
      <Router>
        <Navbar/>

        <Routes>
          <Route path='/' element={<PLP/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/product/:id' element={<PDP/>}/>
        </Routes>
        
      </Router>

    )
  }
}


export default App;

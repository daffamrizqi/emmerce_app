import './App.css';
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css"

// react router
import Home from "./pages/Home";
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Admin from "./pages/Admin"
import Cart from "./pages/Cart"
import History from "./pages/History"
import ProductDetail from "./pages/ProductDetail"
import MyNavbar from './components/MyNavbar';

import { connect } from 'react-redux';
import { userKeepLogin, checkStorage } from './redux/actions/user'

class App extends React.Component {

  componentDidMount() {
    const userLocalStorage = localStorage.getItem("userDataEmmerce")

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage)
      this.props.userKeepLogin(userData)
    } else {
      this.props.checkStorage()
    }
  }

  render () {
    if (this.props.userGlobal.storageIsChecked){
      return (
        <BrowserRouter>
          {/* di render diluar routes agar navbar menjadi static component yang akan sama pada setiap pages */}
          <MyNavbar />
          <Routes>
            <Route element={<Login/>} path="/login" />
            <Route element={<Register/>} path="/register" />
            <Route element={<Admin/>} path="/admin" />
            <Route element={<Cart/>} path="/cart" />
            <Route element={<History/>} path="/history" />
            <Route element={<ProductDetail/>} path="/product-detail" />
            <Route element={<Home/>} path="/" />
          </Routes>
        </BrowserRouter>
      )
    } 
    return (
      <div>
        Loading . . .
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user
  }
}

const mapDispatchToProps = {
  userKeepLogin,
  checkStorage
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
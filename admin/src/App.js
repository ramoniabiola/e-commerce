import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home'
import Userlist from "./pages/userlist/Userlist";
import User from "./pages/user/User";
import Newuser from "./pages/newuser/Newuser";
import ProductList from "./pages/products/ProductList";
import Product from "./pages/product/Product";
import Newproduct from "./pages/newproduct/Newproduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";


function App() {
  const currentUser = useSelector(state => state.user.user.currentUser);
  const isAdmin = currentUser && currentUser.isAdmin;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!isAdmin ? <Login /> : <Navigate to="/" />} />
        <Route
          path="/*"
          element={
            isAdmin ? (
              <React.Fragment>
                <Topbar />
                <div className="container">
                  <Sidebar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<Userlist />} />
                    <Route path="/user/:userId" element={<User />} />
                    <Route path="/newuser" element={<Newuser />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/product/:productId" element={<Product />} />
                    <Route path="/newproduct" element={<Newproduct />} />
                  </Routes>
                </div>
              </React.Fragment>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}



export default App;

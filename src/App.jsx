import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/global.css";

import Layout from "./components/common/Layout";
import UserList from "./components/user/UserList";
import UserDetail from "./components/user/UserDetail";
import UserForm from "./components/user/UserForm";
import OrderList from "./components/order/OrderList";
import OrderDetail from "./components/order/OrderDetail";
import OrderForm from "./components/order/OrderForm";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<div>首頁</div>} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/new" element={<OrderForm />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

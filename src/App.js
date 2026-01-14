import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './Signin';
import VerifyEmail from './VerifyEmail';
import Signup from './Signup';
import Home from './Home';
import UserList from './UserList';
import Conversation from "./Conversation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Conversation />} />
      </Routes>
    </Router>
  );
}

export default App;

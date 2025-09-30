import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import InboxPage from "./pages/InboxPage";
import MailPage from "./pages/MailPage";
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/inbox" element={
          <PrivateRoute>
          <InboxPage />
          </PrivateRoute>
          } />

        <Route path="/mail/:id" element={
            <PrivateRoute>
              <MailPage />
            </PrivateRoute>
          } />

       
      </Routes>
    </BrowserRouter>
  );
}

export default App;

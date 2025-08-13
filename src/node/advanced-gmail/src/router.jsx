import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PasswordPage from "./pages/PasswordPage";
import InboxPage from "./pages/InboxPage";
import MailPage from "./pages/MailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
  {/** ChooseMailPage removed - routes cleaned */}
        <Route path="/password" element={<PasswordPage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/mail" element={<MailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

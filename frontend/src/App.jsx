import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";


function App() {

  return (
    <BrowserRouter>

  <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/login" element={<Login />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/create-listing" element={<CreateListing />} />
  <Route path="/edit-listing/:id" element={<EditListing />} />
  <Route path="/profile" element={<Profile />} />
  
</Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyListings from "./pages/MyListings";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";


function App() {

  return (
    <BrowserRouter>

  <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/login" element={<Login />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/my-listings" element={<MyListings />} />
  <Route path="/create-listing" element={<CreateListing />} />
  <Route path="/edit-listing/:id" element={<EditListing />} />
  
</Routes>
    </BrowserRouter>
  );
}

export default App;
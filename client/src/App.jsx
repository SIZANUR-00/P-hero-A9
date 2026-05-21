import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllFacilities from './pages/AllFacilities';
import FacilityDetails from './pages/FacilityDetails';
import MyBookings from './pages/MyBookings';
import AddFacility from './pages/AddFacility';
import ManageMyFacilities from './pages/ManageMyFacilities';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/facilities" element={<AllFacilities />} />
                <Route path="/facility/:id" element={
                  <PrivateRoute>
                    <FacilityDetails />
                  </PrivateRoute>
                } />
                <Route path="/my-bookings" element={
                  <PrivateRoute>
                    <MyBookings />
                  </PrivateRoute>
                } />
                <Route path="/add-facility" element={
                  <PrivateRoute>
                    <AddFacility />
                  </PrivateRoute>
                } />
                <Route path="/manage-facilities" element={
                  <PrivateRoute>
                    <ManageMyFacilities />
                  </PrivateRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
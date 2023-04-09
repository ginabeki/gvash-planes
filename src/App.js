import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

// Pages
import HomePage from './pages/Home/Home';
import AddPlane from './pages/AddPlane/AddPlane';

// Auth-Pages
import Register from './pages/auth/Register/Register';
import Login from './pages/auth/Login/Login';
import AuthLayout from './pages/auth/Layout/Layout';

// Components
import AdminRoute from './components/ProtectedRoute/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ErrorMessage from './components/messages/ErrorMessage';
import NoticeMessage from './components/messages/NoticeMessage';
import { clearAll } from './slices/appSlice/appSlice';
import Reservations from './pages/reservations/Resvervations';

// Stylesheet
import './App.css';

function App() {
  const alert = useSelector((state) => state.app.alert);
  const notice = useSelector((state) => state.app.notice);
  const dispatch = useDispatch();
  // remove the alert and notice after 10 seconds
  useEffect(() => {
    if (alert || notice) {
      setTimeout(() => {
        dispatch(clearAll());
      }, 10000);
    }
  });
  return (
    <div className="App font-primary">
      {alert && <ErrorMessage message={alert} />}
      {notice && <NoticeMessage message={notice} /> }
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* guests routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* protected routes aka users routes */}
        <Route element={<ProtectedRoute />}>
          {/* this is the example route and usage you can find how to use it in that component */}
          <Route path="/user" element={<HomePage />} />
          <Route path="/reservations" element={<Reservations />} />
        </Route>

        {/* You can define admin routes here */}

        <Route element={<AdminRoute />}>
          {/* this is the example route and usage you can find how to use it in that component */}
          <Route path="/planes/new" element={<AddPlane />} />
        </Route>

        {/* 404 redirect to / */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

    </div>
  );
}

export default App;
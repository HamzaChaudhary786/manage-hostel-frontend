import { Route, Routes } from 'react-router-dom';
import Layout from '@/layouts/layout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import AuthCallbackPage from '@/pages/AuthCallbackPage';
import ProtectedRoute from '@/auth/ProtectedRoute';
import UserProfile from '@/pages/UserProfilePage';
import UserHostelPage from '@/pages/UserHostelPage';
import SearchPage from '@/pages/SearchPage';
import DetailPage from '@/pages/DetailPage';
import BookingStatus from '@/pages/BookingStatus';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout><HomePage /></Layout>} />
      <Route path='/auth-callback' element={<AuthCallbackPage />} />
      <Route path='/about' element={<Layout><AboutPage /></Layout>} />
      <Route path='/search/:city' element={<Layout><SearchPage /></Layout>} />
      <Route path='/detail/:hostelId' element={<Layout><DetailPage /></Layout>} />

      <Route element={<ProtectedRoute />}>
        <Route path='/user-profile' element={<Layout><UserProfile /></Layout>} />
        <Route path='/booking-status' element={<Layout><BookingStatus /></Layout>} />

        <Route path='/manage-hostel' element={<Layout><UserHostelPage /></Layout>} />
      </Route>

      <Route path='*' element={<><h1>Page Not Found</h1></>} />
    </Routes>
  );
};

export default AppRoutes;

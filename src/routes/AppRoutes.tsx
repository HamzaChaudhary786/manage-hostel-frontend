import { Route, Routes } from 'react-router-dom'
import Layout from '@/layouts/layout'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import AuthCallbackPage from '@/pages/AuthCallbackPage'
import ProtectedRoute from '@/auth/ProtectedRoute'
import UserProfile from '@/pages/UserProfilePage'
import UserHostelPage from '@/pages/UserHostelPage'
const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout><HomePage /></Layout>} />
            <Route path='/auth-callback' element={<AuthCallbackPage />} />
            <Route path='/about' element={<Layout><AboutPage /></Layout>} />

            <Route element={<ProtectedRoute />}>
                <Route path='/user-profile' element={<Layout ><UserProfile /></Layout>} />
                <Route path='/manage-hostel' element={<Layout ><UserHostelPage /></Layout>} />

            </Route>
            <Route path='*' element={<><h1>Not Page Found</h1></>} />
        </Routes>
    )
}

export default AppRoutes
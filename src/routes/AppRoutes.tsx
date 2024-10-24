import { Route, Routes } from 'react-router-dom'
import Layout from '@/layouts/layout'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout><HomePage /></Layout>} />
            <Route path='/about' element={<Layout><AboutPage /></Layout>} />
            <Route path='*' element={<><h1>Not Page Found</h1></>} />
        </Routes>
    )
}

export default AppRoutes
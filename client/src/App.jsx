import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import Home from './components/TempHome'
import APList from './components/APList'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './components/Profile'
import EditPassword from './components/EditPassword'
import { UserContext } from './context/UserProvider'
import './App.css'

function App() {
  const { token, logout } = useContext(UserContext)

  return (
    <div className='container'>
      <div className='App p-2 rounded'>
        <Navbar logout={logout} token={token} />
        <Routes>
            <Route path='/' element={ token ? <Profile/> : <Auth/>}/>
            <Route path='/home' element={<ProtectedRoute token={token} redirectTo={<Auth/>}>
                <Home/>
              </ProtectedRoute>}/>
            <Route path='/allPosts' element={<ProtectedRoute token={token} redirectTo={<Auth/>}>
                <APList/>
              </ProtectedRoute>}/>
            <Route path='/editPassword' element={<ProtectedRoute token={token} redirectTo={<Auth/>}>
                <EditPassword/>
              </ProtectedRoute>}/>
            {/* <Route path='/allPosts' element={<ProtectedRoute token={token} redirectTo={<Auth/>}>
                <EditPassword/>
              </ProtectedRoute>}/> */}
        </Routes>
      </div>
    </div>
  )
}

export default App

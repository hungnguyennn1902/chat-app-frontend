import { BrowserRouter, Routes, Route } from 'react-router'
import HomeChatPage from './pages/HomeChatPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import {Toaster} from 'sonner'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { useAuthStore } from './stores/useAuthStore'
import { useSocketStore } from './stores/useSocketStore'
import { useEffect } from 'react'

function App() {
  const {accessToken} = useAuthStore()
  const {connectSocket, disconnectSocket} = useSocketStore()

  useEffect(()=>{
    if(accessToken){
      connectSocket()
    }
    return () => disconnectSocket()
  }, [accessToken])

  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomeChatPage />} />
          </Route>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import{ Navigate, Outlet } from "react-router";
const ProtectedRoute = () => {
    const { accessToken , loading, refreshToken} = useAuthStore();
    const [isInitialized, setIsInitialized] = useState(false)

    const init = async () => {
        if(!accessToken){
            await refreshToken()
        }
        setIsInitialized(true)
    }

    useEffect(() => {
        init();
    }, []);

    if (!isInitialized || loading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>
    }
    if (!accessToken) {
        return <Navigate to="/signin" replace />
    }
    return (
        <Outlet></Outlet>
    )
}
export default ProtectedRoute   
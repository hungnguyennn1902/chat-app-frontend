import Logout from "@/components/auth/Logout"
import { useAuthStore } from "@/stores/useAuthStore"

function HomeChatPage() {
  const user = useAuthStore((state) => state.user)
  return (
    <>
      <div>
        <h1>{user?.username}</h1>
        <Logout />
      </div>

    </>
  )
}
export default HomeChatPage
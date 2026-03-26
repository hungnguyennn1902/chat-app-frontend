import ChatWindowLayout from "@/components/chat/ChatWindowLayout"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { useThemeStore } from "@/stores/useThemeStore"
import { useEffect } from "react"

function HomeChatPage() {
  const {isDark, setTheme} = useThemeStore()

  useEffect(()=>{
    setTheme(isDark)
  },[])
  
  return (
    
      <SidebarProvider>
        <AppSidebar />
        <div className="flex h-screen w-full p-2">
          <ChatWindowLayout />
        </div>
      </SidebarProvider>
    
  )
}
export default HomeChatPage
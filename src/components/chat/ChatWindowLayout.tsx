import { useChatStore } from "@/stores/useChatStore"
import ChatWelcomeScreen from "./ChatWelcomeScreen"
import ChatWindowSkeleton from "./ChatWindowSkeleton"
const ChatWindowLayout = () =>{
    const { activeConversationId, conversations, messageLoading:loading, messages } = useChatStore()
    const selectedConvo = conversations.find((c) => c._id === activeConversationId) ?? null
    if(!selectedConvo) {
        return <ChatWelcomeScreen />
    }
    if(loading){
        return <ChatWindowSkeleton />
    }

    
    return(
        <div>
            <h1>Chat Window L   ayout</h1>
        </div>
    )
}
export default ChatWindowLayout
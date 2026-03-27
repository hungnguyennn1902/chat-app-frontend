import { useChatStore } from "@/stores/useChatStore"
import DirectChatCard from "./DirectChatCard"
const DirectChatList = () => {
    const { conversations } = useChatStore()
    if(!conversations) return;
    const directConversations = conversations.filter(convo => convo.type === "direct")
    console.log("Conversations:", conversations) // Debug log
    return(
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {directConversations.map((convo) => {
                return <DirectChatCard convo={convo} />
            })}
             
        </div>
    )
}
export default DirectChatList
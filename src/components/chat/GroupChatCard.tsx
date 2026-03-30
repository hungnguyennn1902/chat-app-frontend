import type { Conversation } from "@/types/chat"
import ChatCard from "./ChatCard"
import { useAuthStore } from "@/stores/useAuthStore"
import { useChatStore } from "@/stores/useChatStore"
import { cn } from "@/lib/utils"
import UnreadCountBadge from "./UnreadCountBadge"
import GroupChatAvatar from "./GroupChatAvatar"
const GroupChatCard = ({ convo }: { convo: Conversation }) => {
    const { user } = useAuthStore()
    const { activeConversationId, setActiveConversation, messages, fetchMessages } = useChatStore()
    if (!user) return null;

    const lastMessage = convo.lastMessage?.content ?? ""
    const unreadCount = convo.unreadCount[user._id]
    const name = convo.group?.name ?? "Unknown Group"


    const handleSelectConversation = async (id: string) => {
        setActiveConversation(id)
        if (!messages[id]) {
            await fetchMessages(id)
        }
    }

    return (
        <ChatCard
            convoId={convo._id}
            name={name}
            timestamp={
                convo.lastMessage?.createdAt ? new Date(convo.lastMessage.createdAt) : undefined
            }
            isActive={activeConversationId === convo._id}
            onSelect={handleSelectConversation}
            unreadCount={unreadCount}
            leftSection={
                <>
                {unreadCount>0 && <UnreadCountBadge unreadCount={unreadCount} />}
                <GroupChatAvatar participants={convo.participants} type="sidebar" />
                </>
            }
            subtitle={
                <p className={cn("text-sm truncate",
                    unreadCount > 0 ? "font-medium text-foreground" : "text-muted-foreground"
                )}>
                    {lastMessage}
                </p>

            }
        />
    )
}
export default GroupChatCard
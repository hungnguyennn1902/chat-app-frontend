import {create} from 'zustand';
import {io, type Socket} from 'socket.io-client';
import { useAuthStore } from './useAuthStore';
import type { SocketState } from '@/types/store';
import { useChatStore } from './useChatStore';
const baseURL = import.meta.env.VITE_SOCKET_BASE_URL 
export const useSocketStore = create<SocketState>((set,get)=>({
    socket: null,
    onlineUsers: [],
    connectSocket: () => {
        const { accessToken } = useAuthStore.getState()
        const existingSocket = get().socket
        if(existingSocket) return;
        const socket: Socket = io(baseURL, {
            auth: {token: accessToken},
            transports: ['websocket']
        })
        set({socket})
        socket.on("connect", () => {
            console.log("Socket connected");
        });

        socket.on("online_users", (userIds) =>{
            set({onlineUsers: userIds})
        })

        socket.on("new_message", ({message, conversation, unreadCount}) => {
            useChatStore.getState().addMessage(message)
            const lastMessage = {
                _id: conversation.lastMessage._id,
                content: conversation.lastMessage.content,
                createdAt: conversation.lastMessage.createdAt,
                sender: {
                    _id: conversation.lastMessage.senderId,
                    displayName: "",
                    avatarUrl: null,
                }

            }
            const updatedConversation = {
                ...conversation,
                lastMessage,
                unreadCount
            }

            if(useChatStore.getState().activeConversationId == message.conversationId){
                useChatStore.getState().markAsSeen()
            }

            useChatStore.getState().updateConversation(updatedConversation)
        })

        socket.on("read-message",({conversation, lastMessage})=>{
            const updated = {
                _id: conversation._id,
                lastMessage,
                lastMessageAt: conversation.lastMessageAt,
                unreadCount: conversation.unreadCount,
                seenBy: conversation.seenBy
            }
            useChatStore.getState().updateConversation(updated)
        })

    },
    disconnectSocket: () => {
        const socket = get().socket
        if(socket){
            socket.disconnect()
            set({socket: null})
            console.log("Socket disconnected");
        }
    }
}))
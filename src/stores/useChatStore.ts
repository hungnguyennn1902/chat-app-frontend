import { chatService } from '@/services/chatService'
import type { ChatState } from '@/types/store'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useChatStore = create<ChatState>()(
    persist(
        (set) => ({
            conversations: [],
            messages: {},
            activeConversationId: null,
            loading: false,

            setActiveConversation: (id) => set({ activeConversationId: id }),
            reset: () => set({ conversations: [], messages: {}, activeConversationId: null, loading: false }),
            fetchConversations: async () => {
                try {

                    const conversations = await chatService.fetchConversations();
                    console.log("Fetched Conversations:", conversations);
                    set({ conversations });
                    // set({ conversations });
                    // console.log("Fetched Conversations:", conversations);

                } catch (error) {
                    console.error("Lỗi xảy ra khi fetchConversations:", error);

                }
            },
        }), {
        name: "chat-storage",
        partialize: (state) => ({
            conversations: state.conversations,
        })
    }
    )
)
import api from '@/lib/axios';
import type { Conversation, Message} from '@/types/chat';

interface FetchMessageProps {
    messages : Message[];
    cursor?: string
}
const pageLimit = 50
export const chatService = {
    async fetchConversations(): Promise<Conversation[]> {
        const response = await api.get('/conversations');
        return response.data.data;
    },

    async fetchMessages(id: string, cursor?: string): Promise<FetchMessageProps> {
        const response = await api.get(`/conversations/${id}/messages?limit=${pageLimit}&cursor=${cursor || ""}`);

        return {
            messages: response.data.data.messages,
            cursor: response.data.data.nextCursor
        }
    },

    async sendDirectMessage(recipientId: string, content:string = "", conversationId?: string, imgUrl?: string){
        const response = await api.post('/messages/direct', {
            recipientId,
            content,
            conversationId,
            imgUrl
        });
        return response.data.data;
    },

    async sendGroupMessage(conversationId: string, content: string = "", imgUrl?: string) {
        const response = await api.post('/messages/group', {
            conversationId,
            content,
            imgUrl
        });
        return response.data.data;
    },

    async markAsSeen(conversationId: string) {
        const res = await api.patch(`/conversations/${conversationId}/seen`);
        return res.data.data;
    }

}
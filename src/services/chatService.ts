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
    }
}
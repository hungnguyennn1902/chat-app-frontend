import api from '@/lib/axios';
import type { Conversation} from '@/types/chat';
export const chatService = {
    async fetchConversations(): Promise<Conversation[]> {
        const response = await api.get('/conversations');
        console.log("API Response:", response.data.data);
        return response.data.data;
    }
}
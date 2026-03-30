import type { Conversation, Message } from "./chat.ts";
import type { User } from "./user";
export interface AuthState {
    accessToken: string | null;
    user: User | null;
    loading: boolean;

    clearState: () => void;
    signUp: (
        username: string,
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) => Promise<void>;

    signIn: (
        username: string,
        password: string
    ) => Promise<void>;

    signOut: () => Promise<void>;

    fetchMe: () => Promise<void>;

    refreshToken: () => Promise<void>;

    setAccessToken: (accessToken: string) => void;
}

export interface ThemeState {
    isDark: boolean;
    toggleTheme: () => void;
    setTheme: (dark: boolean) => void;

}

export interface ChatState {
    conversations: Conversation[];
    messages: Record<
        string,
        {
            items: Message[];
            hasMore: boolean; //infinity scroll
            nextCursor?: string | null; // for pagination
        }
    >;
    activeConversationId: string | null;
    convoLoading: boolean;
    messageLoading: boolean;
    reset: () => void;
    setActiveConversation: (id: string | null) => void;
    fetchConversations: () => Promise<void>;
    fetchMessages: (conversationId: string, cursor?: string) => Promise<void>;
    sendDirectMessage: (recipientId: string, content?: string, conversationId?: string, imgUrl?: string) => Promise<void>;
    sendGroupMessage: (conversationId: string, content?: string, imgUrl?: string) => Promise<void>;
}   
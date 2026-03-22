import api from '@/lib/axios';
export const authService = {
    signUp: async (firstName: string, lastName: string, username: string, email: string, password: string) => {
        const response = await api.post('/auth/signup', {
            firstName,
            lastName,
            username,
            email,
            password
        });
        return response.data;
    },

    signIn: async (username: string, password: string) => {
        const response = await api.post('/auth/signin', {
            username,
            password
        });
        return response.data;
    },

    signOut: async () => {
        return await api.post('/auth/signout');
    }
};

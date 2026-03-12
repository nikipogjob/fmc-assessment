const ACCESS_TOKEN_KEY = 'accessToken';

export const authTokenStorage = {
    get() {
        if (typeof window === 'undefined') {
            return null;
        }
        return window.localStorage.getItem(ACCESS_TOKEN_KEY);
    },

    set(token: string) {
        if (typeof window === 'undefined') {
            return;
        }
        window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
    },
    remove() {
        if (typeof window === 'undefined') {
            return;
        }
        window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    },
};
const ACCESS_TOKEN_KEY = "access_token";

export const setToken = (token) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export const getToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export const removeToken = () => {
    return localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export const checkToken = () => {
    return (localStorage.getItem(ACCESS_TOKEN_KEY) !== null && localStorage.getItem(ACCESS_TOKEN_KEY) !== undefined);
}
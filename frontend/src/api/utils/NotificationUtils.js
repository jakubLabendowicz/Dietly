import { toast } from 'react-toastify';

export const notify = (text, type) => {
    const options = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: type
    };
    toast(text, options);
}

export const showNotification = (message) => {
        notify(message.text, message.type);
}
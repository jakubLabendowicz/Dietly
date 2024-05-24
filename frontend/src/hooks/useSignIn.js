import { useState } from "react";
import { postAuth } from "../api/controllers/AuthApi";

export var useSignIn = () => {
    var [password, setPassword] = useState();
    var [login, setLogin] = useState();
    var signIn = (login, password) => {
        postAuth({
            password: password,
            login: login
        })
        .then(response => {
            window.location = '/home'
        })
    }
    return [password, setPassword, login, setLogin, signIn]
}

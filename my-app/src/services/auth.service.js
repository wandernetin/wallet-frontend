import axios from "axios";
import cookies from "js-cookies";
import jwt from "jwt-decode";

const API_URL = "http://localhost:3333/";

class AuthService {
    async login(username, password) {
        if (!this.isUserAuth()) {
            const response = await axios.post("http://localhost:3333/login", {
                "email": username,
                password,
            });
            console.log(response);
            if (response.data) {
                cookies.setItem("token", response.data.token);
            }

            return response.data;
        }
    }

    logout() {
        cookies.removeItem("token");
        window.localStorage.clear();
    }

    getCurrentUserId() {
        return jwt(this.getCookie()).id;
    }

    getApiUrl() {
        return API_URL;
    }

    isUserAuth() {
        if (this.getCookie()) {
            return (
                parseInt(new Date().getTime(), 10) <
                parseInt(this.getTokenExpirationDate(), 10) * 1000
            );
        }

        return false;
    }

    getCookie() {
        return cookies.getItem("token");
    }

    getTokenExpirationDate() {
        return jwt(this.getCookie()).exp;
    }

    getAuthHeader() {
        const token = cookies.getItem('token');

        if (token) {
            return { Authorization: 'Bearer ' + token };
        } else {
            return {};
        }
    }
}

export default new AuthService();

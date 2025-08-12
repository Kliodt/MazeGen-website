import { jwtDecode } from 'jwt-decode';
import { Api } from './api';

let accessTokenStr = null;
let expirationTimestampMs = null;
let authRequestPromise = null;
let myId = null;

export const AuthApi = {
    getCurrentToken() {
        return accessTokenStr;
    },

    getCurrentUserId() {
        return myId;
    },

    async updateTokenIfExpired() {
        // if token expires in less than 30 seconds
        if (accessTokenStr != null && expirationTimestampMs < Date.now() + 30_000) {
            await this.updateToken();
        }
    },

    async updateToken() {
        // allow only one auth request at a time
        if (authRequestPromise == null) {
            authRequestPromise = Api.apiPost('/auth/token', {}, {}, false).then(resp => {
                if (resp.ok) return resp.json();
                if (resp.status === 401) {
                    console.log('User unauthorized');
                }
                return null;
            });
        }

        try {
            const json = await authRequestPromise;
            if (!json) return;

            const accessToken = json.access_token;
            if (!accessToken) return;

            const decoded = jwtDecode(accessToken);
            expirationTimestampMs = decoded['exp'] * 1000;
            myId = decoded['user_id'];
            accessTokenStr = accessToken;

            console.log(
                `Token updated: expires in ${
                    (expirationTimestampMs - Date.now()) / 1000
                } seconds.`
            );
        } catch (error) {
            console.log('Token update failed: ', error);
        } finally {
            authRequestPromise = null;
        }
    },

    async logoutUser() {
        const result = await Api.apiPost('/auth/logout');
        if (result.status === 200 || result.status === 401) {
            accessTokenStr = null;
            expirationTimestampMs = null;
            myId = null;
            return;
        }
        throw new Error("Can't logout");
    }
};

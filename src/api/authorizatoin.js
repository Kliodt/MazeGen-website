import { jwtDecode } from "jwt-decode";
import { Api } from "./api";


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
            authRequestPromise = Api.apiFetch('/auth/token', {
                method: 'POST',
            }, false)
            .then(resp => resp.json());
        }

        try {
            const json = await authRequestPromise;

            const accessToken = json.access_token;

            if (!accessToken) {
                console.log("Bad accessToken: ", accessToken);
            } else {
                const decoded = jwtDecode(accessToken);
                expirationTimestampMs = decoded['exp'] * 1000;
                myId = decoded['user_id'];
                accessTokenStr = accessToken;

                console.log('New token expires in ', (expirationTimestampMs - Date.now()) / 1000, 's');
            }
        } catch (error) {
            console.log('Token update failed: ', error);

        } finally {
            authRequestPromise = null;
        }

    }


}
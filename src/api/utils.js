import { Api } from "./api";


export const ApiUtils = {
    /**
     * Makes a GraphQL query with string
     * @param {String} queryStr GraphQL query
     */
    async graphqlQuery(queryStr) {
        const response = await this.apiFetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                query: queryStr
            })
        });
        return await response.json();
    },


    /**
     * Common method to make requests to the API
     * @param {String} path url without domain prefix (must start with '\')
     * @param {Object} requestInit object like for the default 'fetch' function
     * @param {boolean} authorized weather to add the 'Authorization' header with the access token
     * @returns {Promise<Response>}
     */
    async apiFetch(path, requestInit, authorized=true) {
        const authHeaders = {};

        if (authorized) {
            Api.updateTokenIfExpired();
            const token = Api.getCurrentToken();
            if (token != null) {
                authHeaders['Authorization'] = 'Bearer ' + token;
            }
        }

        return await fetch('http://localhost:8080' + path, {
            ...requestInit,
            headers: {
                ...requestInit.headers,
                ...authHeaders
            },
            credentials: 'include' // todo: set to 'same-origin'
        });
    },


    /**
     * Simple GET request to api
     * @returns {Promise<Response>}
     */
    async apiGet(path, body, headers, authorized=true) {
        return await this.apiFetch(path, {
            headers: {
                ...headers,
                method: 'GET'
            },
            body
        }, authorized)
    },


    /**
     * Simple POST request to api
     * @returns {Promise<Response>}
    */
    async apiPost(path, body, headers, authorized=true) {
        return await this.apiFetch(path, {
            headers: {
                ...headers,
                method: 'POST'
            },
            body
        }, authorized)
    }
}
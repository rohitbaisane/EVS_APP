const phin = require("phin");

const { CONTAINER_NAME, CONTAINER_PORT } = require("../config/serverConfig");
const baseUrl = `http://localhost:5000`;

module.exports = {
    getRequest: async (path, headers) => {
        let reqData = {
            url: baseUrl + path,
            method: 'GET',
            headers,
            parse: 'json',
        }
        const response = await phin(reqData);
        return { body: response.body, statusCode: response.statusCode };
    },

    postRequest: async (path, data, headers) => {
        let reqData = {
            url: baseUrl + path,
            method: 'POST',
            data,
            parse: 'json',
            headers,
        }
        const response = await phin(reqData);
        console.log(response.body);
        return { body: response.body, statusCode: response.statusCode };
    },

    patchRequest: async (path, data, headers) => {
        let reqData = {
            url: baseUrl + path,
            method: 'PATCH',
            parse: 'json',
            data,
            headers,
        }
        const response = await phin(reqData);
        return { body: response.body, statusCode: response.statusCode };
    },

    deleteRequest: async (path, headers) => {
        let reqData = {
            url: baseUrl + path,
            method: 'DELETE',
            parse: 'json',
            headers,
        }
        const response = await phin(reqData);
        return { body: response.body, statusCode: response.statusCode };
    }
};
import axios from 'axios'
import { useState, useEffect } from 'react'

export const useApiProgress = (apiMethod, apiPath, strictPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false);

    useEffect(() => {
        let requestIntercepter, responseIntercepter;

        const updateApiCallFor = (method, url, inProgress) => {
            if (method !== apiMethod) {
                return;
            }
            if (strictPath && url === apiPath) {
                setPendingApiCall(inProgress);
            } else if (!strictPath && url.startsWith(apiPath)) {
                setPendingApiCall(inProgress);
            }
        }

        const registerInterceptors = () => {

            requestIntercepter = axios.interceptors.request.use((request) => {
                const { url, method } = request;
                updateApiCallFor(method, url, true);
                return request
            })
            responseIntercepter = axios.interceptors.response.use((response) => {
                const { url, method } = response.config;
                updateApiCallFor(method, url, false);
                return response
            }, (error) => {
                const { url, method } = error.config;
                updateApiCallFor(method, url, false);
                throw error
            })
        };

        const unregisterInterceptors = () => {
            axios.interceptors.request.eject(requestIntercepter);
            axios.interceptors.response.eject(responseIntercepter);
        }

        registerInterceptors();

        return function unmount() {
            unregisterInterceptors();
        }
    }, [apiPath, apiMethod, strictPath]);

    return pendingApiCall;
}
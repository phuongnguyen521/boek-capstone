<<<<<<< HEAD
import axios, { AxiosInstance, AxiosResponse } from "axios";
import qs from "qs";

const getAxiosClient = (
    accessToken?: string,
    customURL?: string,
): AxiosInstance => {
    const axiosClient = axios.create({

        baseURL: customURL ?? process.env.NEXT_PUBLIC_API_URL,
    });
    axiosClient.interceptors.request.use((config) => {
        if (config.headers && accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        config.paramsSerializer = {
            serialize: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
        };
=======
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const getAxiosClient = (
    accessToken?: string,
    customURL?: string
): AxiosInstance => {
    const axiosClient = axios.create({
        baseURL: customURL ?? process.env.NEXT_PUBLIC_API_URL,
    });
    axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
        if (config.headers && accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
        return config;
    });

    axiosClient.interceptors.response.use(
        (response: AxiosResponse) => response,
<<<<<<< HEAD
        (error) => Promise.reject(error.response && error.response.data),
=======
        (error) => Promise.reject(error.response && error.response.data)
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
    );

    return axiosClient;
};

export default getAxiosClient;

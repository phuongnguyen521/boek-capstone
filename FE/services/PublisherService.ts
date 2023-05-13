<<<<<<< HEAD
import { IBaseRequestParams } from "./../types/Request/IBaseRequestParams";
import { BaseService } from "./BaseService";
import { IBaseListResponse } from "../types/Commons/IBaseListResponse";
import { IPublisher } from "../types/Publisher/IPublisher";

export type UpdatePublisherParams = Required<Omit<IPublisher, "code">>;

export type CreatePublisherParams = Omit<UpdatePublisherParams, "id">;

export class PublisherService extends BaseService {
    getPublishers = async (params?: IBaseRequestParams<IPublisher>) => {
        const response = await this.axiosClient.get<
            IBaseListResponse<IPublisher>
        >("/publishers", {
=======
import { ILoginResponse } from './../types/response/ILoginResponse';
import { AxiosInstance } from 'axios';
import getAxiosClient from './axiosClient';
import { IBaseListResponse } from '../types/response/IBaseListResponse';
import { IPostResponse } from '../types/response/IPostResponse';
import { IPublisher } from '../types/user/IPublisher';

export class PublisherService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    getPublishers = async (params?: any) => {
        const response = await this.axiosClient.get<
            IBaseListResponse<IPublisher>
        >('/publishers', {
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
            params,
        });
        return response.data;
    };
<<<<<<< HEAD

    getAllPublishers = async (): Promise<IPublisher[]> => {
        const response = await this.getPublishers();
        const { data, metadata: { total } } = response;
        if (data.length < total) {
            const newResponse = await this.axiosClient.get<
                IBaseListResponse<IPublisher>
            >("/publishers", {
                params: {
                    size: total,
                },
            });
            return newResponse.data.data;
        }
        return data;
    };

    deletePublisher = async (id: number) => {
        const response = await this.axiosClient.delete<IPublisher>(
            `/admin/publishers/${id}`,
        );
        return response.data;
    };

    createPublisher = async (data: CreatePublisherParams) => {
        const response = await this.axiosClient.post<IPublisher>(
            "/admin/publishers",
            data,
        );
        return response.data;
    };

    updatePublisher = async (data: UpdatePublisherParams) => {
        const response = await this.axiosClient.put<IPublisher>(
            "/admin/publishers",
            data,
        );
        return response.data;
    };
=======
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
}

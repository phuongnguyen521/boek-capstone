<<<<<<< HEAD
import { IBaseRequestParams } from "./../types/Request/IBaseRequestParams";
import { BaseService } from "./BaseService";
import { IBaseListResponse } from "../types/Commons/IBaseListResponse";
import { IAuthor } from "../types/Author/IAuthor";

export type UpdateAuthorParams = Required<Pick<IAuthor, "id" | "name">> &
    Partial<Pick<IAuthor, "description" | "imageUrl">>;

export type CreateAuthorParams = Omit<UpdateAuthorParams, "id">;

export class AuthorService extends BaseService {
    getAuthors = async (params?: IBaseRequestParams<IAuthor>) => {
        const response = await this.axiosClient.get<IBaseListResponse<IAuthor>>(
            "/authors",
            {
                params,
            },
        );
        return response.data;
    };

    getAllAuthors = async (
        params?: IBaseRequestParams<IAuthor>,
    ) => {
        const response = await this.getAuthors(params);

        const { data, metadata: { total } } = response;
        if (data.length < total) {
            const newParams = {
                ...params,
                page: params?.page || 1,
                size: total,
            };
            const newResponse = await this.getAuthors(newParams);
            return newResponse.data;
        }
        return response.data;
    };

    deleteAuthor = async (id: number) => {
        const response = await this.axiosClient.delete<IAuthor>(
            `/admin/authors/${id}`,
        );
        return response.data;
    };

    createAuthor = async (data: CreateAuthorParams) => {
        const response = await this.axiosClient.post<IAuthor>(
            "/admin/authors",
            data,
        );
        return response.data;
    };

    updateAuthor = async (data: UpdateAuthorParams) => {
        const response = await this.axiosClient.put<IAuthor>(
            "/admin/authors",
            data,
=======
import { ILoginResponse } from './../types/response/ILoginResponse';
import { AxiosInstance } from 'axios';
import getAxiosClient from './axiosClient';
import { IBaseListResponse } from '../types/response/IBaseListResponse';
import { IPostResponse } from '../types/response/IPostResponse';
import { IPublisher } from '../types/user/IPublisher';
import { IAuthor } from '../types/author/IAuthor';

export class AuthorService {
    private readonly axiosClient: AxiosInstance;

    constructor(accessToken?: string) {
        this.axiosClient = getAxiosClient(accessToken);
    }

    getAuthors = async (params?: any) => {
        const response = await this.axiosClient.get<IBaseListResponse<IAuthor>>(
            '/authors',
            {
                params,
            }
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
        );
        return response.data;
    };
}

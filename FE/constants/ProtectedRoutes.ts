<<<<<<< HEAD
import { Roles } from "./Roles";

export interface IProtectedRoute {
    path: string;
    allowedRoleIDs: number[] | "authenticated";
}

export const ProtectedRoutes: IProtectedRoute[] = [
    {
        path: "/admin",
        allowedRoleIDs: [Roles.SYSTEM.id],
    },
    {
        path: "/issuer",
        allowedRoleIDs: [Roles.ISSUER.id],
    },
    {
        path: "/profile",
        allowedRoleIDs: [Roles.CUSTOMER.id],
    },
    {
        path: "/orders",
        allowedRoleIDs: [Roles.CUSTOMER.id],
    },
    {
        path: "/protected",
        allowedRoleIDs: "authenticated",
=======
import { Roles } from './Roles';

export interface IProtectedRoute {
    path: string;
    allowedRoleIDs: number[] | 'all'; // 'all' means all roles are allowed (unauthenticated users are not allowed)
}

export const PROTECTED_ROUTES: IProtectedRoute[] = [
    {
        path: '/cart',
        allowedRoleIDs: [Roles.CUSTOMER.id],
    },
    {
        path: '/orders',
        allowedRoleIDs: [Roles.CUSTOMER.id],
    },
    {
        path: '/admin',
        allowedRoleIDs: [Roles.SYSTEM.id],
    },
    {
        path: '/protected',
        allowedRoleIDs: 'all',
    },
    {
        path: '/issuer',
        allowedRoleIDs: [Roles.ISSUER.id],
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
    },
];

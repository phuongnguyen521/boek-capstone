<<<<<<< HEAD
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import "../styles/global.scss";
import { Toaster, ToasterProps } from "react-hot-toast";
import { initFirebaseApp } from "../old-services/initFirebase";
import { Fragment, ReactElement, ReactNode, useMemo } from "react";
import { NextPage } from "next";
import { AuthContextProvider } from "../context/AuthContext";
import ProtectedRouteWrapper from "../components/ProtectedRouteWrapper";
import { useRouter } from "next/router";
import { ProtectedRoutes } from "../constants/ProtectedRoutes";
import "react-day-picker/dist/style.css";
import "swiper/css";
import "swiper/css/pagination";
const queryClient = new QueryClient();

initFirebaseApp();
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type CustomAppProps = AppProps & {
    Component: NextPageWithLayout;
};

const toasterConfig: ToasterProps = {
    position: "top-right",
    toastOptions: {
        className: "custom-toast",
    },
    gutter: 12,
};

export default function App({ Component, pageProps }: CustomAppProps) {
    const getLayout = Component.getLayout ?? ((page) => page);


    const router = useRouter();

    const isProtectedRoute = useMemo(
        () =>
            ProtectedRoutes.find((route) => router.pathname.startsWith(route.path)),
        [router.pathname],
    );


    const component = getLayout(<Component {...pageProps} />);
    return (
        <QueryClientProvider client={queryClient}>

            <AuthContextProvider>
                {isProtectedRoute ? (
                    <ProtectedRouteWrapper routeData={isProtectedRoute}>
                        {component}
                    </ProtectedRouteWrapper>
                ) : (
                    <Fragment>{component}</Fragment>
                )}
            </AuthContextProvider>
            <Toaster {...toasterConfig} />
=======
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from '../components/Commons/ProtectedRoute';
import { PROTECTED_ROUTES } from '../constants/ProtectedRoutes';
import { AuthContextProvider } from '../context/AuthContext';
import { initFirebaseApp } from '../utils/firebase/initFirebase';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/globals.css';

initFirebaseApp();
const queryClient: QueryClient = new QueryClient();

function BookFairApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    console.log(router.pathname);
    const isProtectedRoute = PROTECTED_ROUTES.find((route) =>
        router.pathname.startsWith(route.path)
    );

    console.log(isProtectedRoute);
    // useEffect(() => {
    //     if (router.query.unauthorized) {
    //         toast.error(
    //             'Tài khoản của bạn không được cấp quyền truy cập vào trang này'
    //         );
    //
    //         const params = new URLSearchParams();
    //
    //         // remove query param
    //         router.replace({ pathname, query: params.toString() }, undefined, {
    //             shallow: true,
    //         });
    //     }
    // }, [router, pathname]);

    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer
                className={'opacity-90'}
                position={'bottom-right'}
                theme={'dark'}
            />
            <AuthContextProvider>
                {isProtectedRoute ? (
                    <ProtectedRoute routeData={isProtectedRoute}>
                        <Component {...pageProps} />
                    </ProtectedRoute>
                ) : (
                    <Component {...pageProps} />
                )}
            </AuthContextProvider>
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
<<<<<<< HEAD
=======

export default BookFairApp;
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb

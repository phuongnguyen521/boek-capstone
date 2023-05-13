<<<<<<< HEAD
import React, { Fragment, useMemo, useState } from "react";
import { NextPageWithLayout } from "../_app";
import CustomerLayout from "../../components/Layout/CustomerLayout";
import CustomerSettingsLayout from "../../components/Layout/CustomerSettingsLayout";
import { Tab } from "@headlessui/react";
import Chip from "../../components/Admin/Chip";
import { DeliveryOrderTabs, getOrderStatusById, PickupOrderTabs } from "../../constants/OrderStatuses";
import { OrderTypes } from "../../constants/OrderTypes";
import { useAuth } from "../../context/AuthContext";
import { OrderService } from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import EmptyState, { EMPTY_STATE_TYPE } from "../../components/EmptyState";
import { getFormattedTime } from "../../utils/helper";
import Image from "next/image";
import Link from "next/link";
import OrderDetailCard from "../../components/CustomerOrder/OrderDetailCard";
import Pagination from "../../components/Pagination";
import SearchForm from "../../components/Admin/SearchForm";

const CustomerOrdersPage: NextPageWithLayout = () => {


    const { loginUser } = useAuth();
    const orderService = new OrderService(loginUser?.accessToken);
    const [orderType, setOrderType] = useState(Object.values(OrderTypes)[0].id);
    const [orderStatus, setOrderStatus] = useState(DeliveryOrderTabs[0].id);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");

    const requestParams = useMemo(() => {
        return {
            Type: orderType,
            Status: orderStatus,
            Page: currentPage,
            Size: 5,
            Sort: "OrderDate desc",
            Code: searchValue,
        };
    }, [orderType, orderStatus, currentPage, searchValue]);

    const {
        data: orderData,
        isInitialLoading,
    } = useQuery(["customer_orders", requestParams],
        () => orderService.getOrdersByCustomer(requestParams),
    );




    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-2xl font-bold">
                Lịch sử đơn hàng
            </h1>

            <div className={"flex justify-end"}>
                <SearchForm
                    value={searchValue}
                    onSearchSubmit={setSearchValue}
                    placeholder={"Tìm kiếm đơn hàng..."}
                />
            </div>


            <Tab.Group
                onChange={(index) => setOrderType(Object.values(OrderTypes)[index].id)}
            >
                {/* Tabs */}
                <Tab.List as={"div"} className="relative my-6">
                    <div className="absolute bottom-0 w-full h-px bg-slate-200" aria-hidden="true"></div>
                    <ul className="relative text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
                        {Object.values(OrderTypes).map((tab) => (
                            <Tab
                                key={tab.id}
                                as={"div"}
                                className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8 focus:outline-none cursor-pointer">
                                <span
                                    className="block pb-3 ui-selected:text-indigo-500 text-slate-500 ui-selected:hover:text-slate-600 whitespace-nowrap ui-selected:border-b-2 ui-selected:border-indigo-500">
                                    {tab.displayName}
                                </span>
                            </Tab>
                        ))}
                    </ul>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <Tab.Group onChange={(index) => {
                            setOrderStatus(DeliveryOrderTabs[index].id);
                        }}>
                            <Tab.List>
                                <div className="">
                                    <ul className="flex flex-wrap gap-2">
                                        {DeliveryOrderTabs.map((tab) => (<Tab
                                                as={"div"}
                                                key={tab.id}
                                                className={"focus:outline-none"}
                                            >
                                                {({ selected }) => {
                                                    return (
                                                        <Chip active={selected}>
                                                            {tab.displayName}
                                                        </Chip>
                                                    );
                                                }}
                                            </Tab>
                                        ))}

                                    </ul>
                                </div>
                            </Tab.List>
                        </Tab.Group>
                    </Tab.Panel>
                    <Tab.Panel>
                        <Tab.Group onChange={(index) => {
                            setOrderStatus(PickupOrderTabs[index].id);
                        }}>
                            <Tab.List>
                                <div className="">
                                    <ul className="flex flex-wrap gap-2">
                                        {PickupOrderTabs.map((tab) => (<Tab
                                                as={"div"}
                                                key={tab.id}
                                                className={"focus:outline-none"}
                                            >
                                                {({ selected }) => {
                                                    return (
                                                        <Chip active={selected}>
                                                            {tab.displayName}
                                                        </Chip>
                                                    );
                                                }}
                                            </Tab>
                                        ))}

                                    </ul>
                                </div>
                            </Tab.List>
                        </Tab.Group>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

            <div className="mt-4">
                {isInitialLoading ? <div>Đang tải...</div> :
                    orderData?.data && orderData?.data?.length > 0 ?
                        <Fragment>
                            <div className="space-y-8">
                                {orderData?.data?.map((order) => {
                                    const status = getOrderStatusById(order?.status);
                                    return <div key={order?.id || order?.code}
                                                className={"bg-white rounded-md border"}
                                    >
                                        {/*Header*/}
                                        <div className={"flex justify-between items-center p-4"}>
                                            <div>
                                                <h2 className={"text-lg font-semibold text-gray-600"}>
                                                    {order?.code}
                                                </h2>
                                                <p className={"text-sm text-gray-600"}>
                                                    Ngày đặt
                                                    hàng: {getFormattedTime(order?.orderDate, "HH:mm dd/MM/yyyy")}
                                                </p>
                                            </div>

                                            {/*Status*/}
                                            <div className={"flex items-center"}>
                                                <div className={"flex items-center space-x-2"}>
                                                    <div
                                                        className={`w-2 h-2 rounded-full ${status?.dotColor || "bg-slate-400"}`} />
                                                    <p className={"text-sm text-gray-600"}>
                                                        {order?.statusName}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="bg-indigo-50">
                                            <div className={"flex justify-between items-center px-4 py-2"}>
                                                <div className={"flex items-center gap-2"}>
                                                    <Image
                                                        src={order?.campaign?.imageUrl || ""}
                                                        width={200}
                                                        height={200}
                                                        className={"rounded-full object-cover w-6 h-6"}
                                                        alt={
                                                            ""
                                                        } />
                                                    <div className={"text-sm text-indigo-500 font-medium"}>
                                                        Hội sách: {order?.campaign?.name}
                                                    </div>
                                                </div>

                                                <Link href={`/campaigns/${order?.campaign?.id}`}
                                                      className={"text-sm text-indigo-600 font-medium"}
                                                >
                                                    Xem hội sách
=======
import React, { useState } from 'react';
import { NextPage } from 'next';
import MainLayout from '../../components/Layouts/MainLayout';
import { useAuth } from '../../context/AuthContext';
import { OrderService } from '../../services/OrderService';
import { useInfiniteQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Image from 'next/image';
import DefaultAvatar from '../../assets/images/default_avatar.png';
import { getFormattedPrice } from '../../utils/helper';
import { Tab } from '@headlessui/react';
import Link from 'next/link';
import { OrderStatuses } from '../../constants/Statuses';
import { FiLoader } from 'react-icons/fi';
import { GiBoxUnpacking } from 'react-icons/gi';
import { FaTruck } from 'react-icons/fa';
import { MdDoneAll, MdBlock } from 'react-icons/md';

const OrderStatusTabs = [
    {
        id: 0,
        displayName: 'Đang xử lý',
        icon: <FiLoader />,
    },
    {
        id: 1,
        displayName: 'Đợi nhận hàng',
        icon: <GiBoxUnpacking />,
    },
    {
        id: 2,
        displayName: 'Đang vận chuyển',
        icon: <FaTruck />,
    },
    {
        id: 3,
        displayName: 'Đã giao',
        icon: <MdDoneAll />,
    },
    // Đã nhận hàng tại campaign (đơn dạng pickup)
    {
        id: 4,
        displayName: 'Đã nhận hàng',
        icon: <MdDoneAll />,
    },
    {
        id: 5,
        displayName: 'Đã bị hủy',
        icon: <MdBlock />,
    },
];
const OrderStatusLabel = ({ statusId }: { statusId: number | undefined }) => {
    let color = 'bg-gray-100 text-gray-800';
    switch (statusId) {
        case OrderStatuses.PROCESSING.id:
            color =
                'bg-amber-100 hover:bg-amber-100 text-amber-700 shadow-amber-200';
            break;
        case OrderStatuses.RECEIVED.id:
            color =
                'bg-emerald-100 hover:bg-emerald-100 text-emerald-700 shadow-emerald-200';
            break;
        case OrderStatuses.SHIPPED.id:
            color =
                'bg-emerald-100 hover:bg-emerald-100 text-emerald-700 shadow-emerald-200';
            break;
        case OrderStatuses.WAITING_RECEIVE.id:
            color =
                'bg-blue-100 hover:bg-blue-100 text-blue-700 shadow-blue-200';
            break;
        case OrderStatuses.SHIPPING.id:
            color =
                'bg-blue-100 hover:bg-blue-100 text-blue-700 shadow-blue-200';
            break;
        case OrderStatuses.CANCELLED.id:
            color = 'bg-red-100 hover:bg-red-100 text-red-700 shadow-red-200';
            break;
        default:
            break;
    }
    return (
        <div
            className={`flex w-full items-center justify-center gap-2 rounded-md py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto ${color}`}
        >
            <span>
                {OrderStatusTabs?.find((s) => s.id === statusId)?.displayName}
            </span>
            {OrderStatusTabs?.find((s) => s.id === statusId)?.icon}
        </div>
    );
};

const ViewOrdersPage: NextPage = () => {
    const { loginUser } = useAuth();
    const orderService = new OrderService(loginUser?.accessToken);
    const [selectedStatus, setSelectedStatus] = useState<number>(0);

    const [pageSize] = useState(5);

    const {
        data: orders,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        isInitialLoading,
        isLoading,
    } = useInfiniteQuery(
        ['orders', selectedStatus],
        ({ pageParam = 1 }) =>
            orderService.getOrders({
                status: selectedStatus,
                page: pageParam,
                size: pageSize,
                sort: 'OrderDate desc',
            }),
        {
            getNextPageParam: (lastPage) => {
                const currentPage = lastPage?.metadata?.page;
                const totalPages = Math.ceil(
                    lastPage?.metadata?.total / pageSize
                );
                return currentPage < totalPages ? currentPage + 1 : undefined;
            },
        }
    );
    console.log(orders?.pages);
    return (
        <MainLayout maxWidth={'max-w-6xl'}>
            <div className="bg-white px-4 pt-8 pb-14 sm:px-6 lg:px-8">
                <div className="mb-6 px-4 sm:px-0">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
                        Lịch sử đơn hàng
                    </h1>
                </div>
                <Tab.Group
                    onChange={(index) => {
                        setSelectedStatus(OrderStatusTabs[index].id);
                    }}
                >
                    <div className="border-b border-gray-200">
                        <nav
                            className="-mb-px flex space-x-8"
                            aria-label="Tabs"
                        >
                            {OrderStatusTabs?.map((status) => (
                                <Tab
                                    key={status.id}
                                    className={({ selected }) => {
                                        return `${
                                            selected
                                                ? 'border-indigo-500 text-indigo-600'
                                                : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700'
                                        } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium focus:outline-none`;
                                    }}
                                >
                                    {({ selected }) => {
                                        return (
                                            <>
                                                <span>
                                                    {status.displayName}
                                                </span>
                                                {selected && (
                                                    <span className="ml-3 hidden rounded-full bg-indigo-100 py-0.5 px-2.5 text-xs font-medium text-indigo-600 md:inline-block">
                                                        {orders?.pages?.[0]
                                                            ?.metadata?.total ||
                                                            0}
                                                    </span>
                                                )}
                                            </>
                                        );
                                    }}
                                </Tab>
                            ))}
                        </nav>
                    </div>
                </Tab.Group>

                <div className="mt-16">
                    <div className="sm:space-y-18 space-y-16">
                        {isLoading ? (
                            <div>Đang tải ...</div>
                        ) : (
                            orders?.pages?.map((value) =>
                                value?.data?.map((order) => (
                                    <div key={order?.id}>
                                        <div className="bg-gray-50 px-4 py-6 sm:rounded-t-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
                                            <dl className="flex-auto space-y-4 divide-y divide-gray-200 text-sm text-gray-600 md:grid md:grid-cols-3 md:gap-x-6 md:space-y-0 md:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                                                <div className="flex justify-between md:block">
                                                    <dt className="font-medium text-gray-900">
                                                        Order number
                                                    </dt>
                                                    <dd className="uppercase md:mt-1">
                                                        {order?.id}
                                                    </dd>
                                                </div>
                                                <div className="flex justify-between pt-4 md:block md:pt-0">
                                                    <dt className="font-medium text-gray-900">
                                                        Ngày đặt hàng
                                                    </dt>
                                                    <dd className="md:mt-1">
                                                        <time
                                                            dateTime={
                                                                order?.orderDate
                                                            }
                                                        >
                                                            {order?.orderDate
                                                                ? format(
                                                                      new Date(
                                                                          order?.orderDate
                                                                      ),
                                                                      'HH:mm dd/MM/yyyy',
                                                                      {
                                                                          locale: vi,
                                                                      }
                                                                  )
                                                                : ''}
                                                        </time>
                                                    </dd>
                                                </div>
                                                <div className="flex justify-between pt-4 font-medium text-gray-900 md:block md:pt-0">
                                                    <dt>Tổng tiền</dt>
                                                    <dd className="text-lg font-medium text-indigo-700 md:mt-1">
                                                        {order?.total
                                                            ? getFormattedPrice(
                                                                  order?.total
                                                              )
                                                            : 'N/A'}
                                                    </dd>
                                                </div>
                                            </dl>
                                            <div className="mt-6 space-y-4 sm:flex sm:space-x-4 sm:space-y-0 md:mt-0">
                                                <OrderStatusLabel
                                                    statusId={order?.status}
                                                />
                                                <Link
                                                    href={{
                                                        pathname:
                                                            '/campaigns/[slug]/[id]',
                                                        query: {
                                                            slug: 'campaign',
                                                            id: order
                                                                ?.orderDetails?.[0]
                                                                ?.campaignBook
                                                                ?.participation
                                                                ?.campaignId,
                                                        },
                                                    }}
                                                    className="flex w-full items-center justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto"
                                                >
                                                    Đến sự kiện
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                                                </Link>
                                            </div>
                                        </div>

<<<<<<< HEAD

                                        {/*Products*/}
                                        <div className={"divide-y divide-gray-200"}>
                                            {order?.orderDetails?.map((orderDetail) => {
                                                return (
                                                    <OrderDetailCard
                                                        key={orderDetail?.id}
                                                        orderDetail={orderDetail} />
                                                );
                                            })}
                                        </div>


                                        {/*Footer with grand total*/}

                                        <div className={"flex justify-between items-center p-4 border-t"}>
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <p className={"text-lg text-gray-600"}>
                                                        Tổng tiền:
                                                    </p>
                                                    <p className={"text-lg text-indigo-600 font-medium"}>
                                                        {new Intl.NumberFormat("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }).format(order?.total || 0)}
                                                    </p>
                                                </div>
                                                <p className={"text-sm text-gray-500"}>
                                                    (Đã bao gồm phí vận chuyển và VAT nếu có)
                                                </p>
                                            </div>

                                            <Link href={`/orders/${order?.id}`}
                                                  className={"text-sm bg-indigo-600 text-white px-4 py-2 rounded-md font-medium"}
                                            >
                                                Xem chi tiết
                                            </Link>

                                        </div>
                                    </div>;
                                })}
                            </div>

                            <div className="mt-6 flex justify-end">
                                <Pagination
                                    currentPage={currentPage}
                                    pageSize={5}
                                    totalItems={orderData?.metadata?.total || 0}
                                    onPageChange={p => setCurrentPage(p)}
                                    visiblePageButtonLimit={4}
                                />
                            </div>
                        </Fragment>
                        :
                        <div className={"py-32"}>
                            <EmptyState
                                status={EMPTY_STATE_TYPE.NO_DATA}
                            />
                        </div>
                }
            </div>
        </div>
    );
};

CustomerOrdersPage.getLayout = (page) => <CustomerLayout><CustomerSettingsLayout>
    {page}
</CustomerSettingsLayout></CustomerLayout>;

export default CustomerOrdersPage;
=======
                                        <table className="mt-4 w-full text-gray-500 sm:mt-6">
                                            <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                                                    >
                                                        Sản phẩm
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                                                    >
                                                        Nhà phát hành
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="hidden py-3 pr-8 font-normal sm:table-cell"
                                                    >
                                                        Giá
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="hidden py-3 pr-8 font-normal sm:table-cell"
                                                    >
                                                        Số lượng
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="hidden py-3 pr-8 font-normal sm:table-cell"
                                                    >
                                                        Tạm tính
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                                                {order?.orderDetails?.map(
                                                    (orderDetail) => (
                                                        <tr
                                                            className={'px-2'}
                                                            key={
                                                                orderDetail?.id
                                                            }
                                                        >
                                                            <td className="py-6 pr-8">
                                                                <div className="flex items-center gap-6">
                                                                    <Image
                                                                        width={
                                                                            250
                                                                        }
                                                                        height={
                                                                            250
                                                                        }
                                                                        src={
                                                                            orderDetail
                                                                                ?.campaignBook
                                                                                ?.book
                                                                                ?.imageUrl ||
                                                                            `https://via.placeholder.com/150`
                                                                        }
                                                                        alt={
                                                                            orderDetail
                                                                                ?.campaignBook
                                                                                ?.book
                                                                                ?.name ||
                                                                            ''
                                                                        }
                                                                        className="h-24 w-20 rounded object-cover object-center"
                                                                    />
                                                                    <div>
                                                                        <div className="font-medium text-gray-900">
                                                                            {
                                                                                orderDetail
                                                                                    ?.campaignBook
                                                                                    ?.book
                                                                                    ?.name
                                                                            }
                                                                        </div>
                                                                        <div className="mt-1 sm:hidden">
                                                                            {
                                                                                orderDetail
                                                                                    ?.campaignBook
                                                                                    ?.book
                                                                                    ?.price
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="hidden py-6 pr-8 sm:table-cell">
                                                                <div className="flex items-center gap-1.5">
                                                                    <Image
                                                                        className={
                                                                            'h-6 w-6 rounded-full'
                                                                        }
                                                                        src={
                                                                            orderDetail
                                                                                ?.campaignBook
                                                                                ?.participation
                                                                                ?.issuer
                                                                                ?.imageUrl ||
                                                                            DefaultAvatar.src
                                                                        }
                                                                        alt={
                                                                            orderDetail
                                                                                ?.campaignBook
                                                                                ?.participation
                                                                                ?.issuer
                                                                                ?.name ||
                                                                            ''
                                                                        }
                                                                        width={
                                                                            100
                                                                        }
                                                                        height={
                                                                            100
                                                                        }
                                                                    />
                                                                    <div>
                                                                        {
                                                                            orderDetail
                                                                                ?.campaignBook
                                                                                ?.participation
                                                                                ?.issuer
                                                                                ?.name
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="hidden py-6 pr-8 sm:table-cell">
                                                                {orderDetail
                                                                    ?.campaignBook
                                                                    ?.coverPrice &&
                                                                orderDetail
                                                                    ?.campaignBook
                                                                    ?.book
                                                                    ?.price
                                                                    ? getFormattedPrice(
                                                                          orderDetail
                                                                              ?.campaignBook
                                                                              ?.coverPrice +
                                                                              orderDetail
                                                                                  ?.campaignBook
                                                                                  ?.book
                                                                                  ?.price
                                                                      )
                                                                    : 'N/A'}
                                                            </td>
                                                            <td className="hidden py-6 pr-8 sm:table-cell">
                                                                {
                                                                    orderDetail?.quantity
                                                                }
                                                            </td>
                                                            <td className="hidden py-6 pr-8 font-medium text-indigo-500 sm:table-cell">
                                                                {orderDetail
                                                                    ?.campaignBook
                                                                    ?.coverPrice &&
                                                                orderDetail
                                                                    ?.campaignBook
                                                                    ?.book
                                                                    ?.price &&
                                                                orderDetail?.quantity
                                                                    ? getFormattedPrice(
                                                                          (orderDetail
                                                                              ?.campaignBook
                                                                              ?.coverPrice +
                                                                              orderDetail
                                                                                  ?.campaignBook
                                                                                  ?.book
                                                                                  ?.price) *
                                                                              orderDetail?.quantity
                                                                      )
                                                                    : 'N/A'}
                                                            </td>
                                                            {/*<td className="py-6 font-medium text-right whitespace-nowrap">*/}
                                                            {/*    <a*/}
                                                            {/*        href={''}*/}
                                                            {/*        className="text-indigo-600"*/}
                                                            {/*    >*/}
                                                            {/*        View*/}
                                                            {/*        <span className="hidden lg:inline">*/}
                                                            {/*            {' '}*/}
                                                            {/*            Product*/}
                                                            {/*        </span>*/}
                                                            {/*        <span className="sr-only">*/}
                                                            {/*            , {''}*/}
                                                            {/*        </span>*/}
                                                            {/*    </a>*/}
                                                            {/*</td>*/}
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                ))
                            )
                        )}
                    </div>
                </div>
                {hasNextPage && (
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="mx-auto mt-4 block rounded bg-indigo-50 px-4 py-2 text-base font-medium text-indigo-500 transition disabled:bg-gray-50 disabled:text-gray-500"
                    >
                        {isFetchingNextPage
                            ? 'Đang tải...'
                            : 'Xem thêm đơn hàng'}
                    </button>
                )}
            </div>
        </MainLayout>
    );
};

export default ViewOrdersPage;
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb

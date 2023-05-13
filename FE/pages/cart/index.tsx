<<<<<<< HEAD
import React, { Fragment, useMemo, useState } from "react";
import { NextPageWithLayout } from "../_app";
import CustomerLayout from "../../components/Layout/CustomerLayout";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { ICartItem, useCartStore } from "../../stores/CartStore";
import CartItem from "../../components/ShoppingCart/CartItem";
import { useQuery } from "@tanstack/react-query";
import { OrderCalculationService } from "../../services/OrderCalculationService";
import useDebounce from "../../hooks/useDebounce";
import { useAuth } from "../../context/AuthContext";
import { CampaignFormats } from "../../constants/CampaignFormats";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import SelectOrderPlacementTypeModal from "../../components/Modal/SelectOrderPlacementTypeModal";
import { getOrderParams, useOrderStore } from "../../stores/OrderStore";
import Link from "next/link";
import { GiShoppingBag } from "react-icons/gi";


const chartdata2 = [
    {
        topic: "Topic 1",
        "Group A": 890,
        "Group B": 338,
        "Group C": 538,
        "Group D": 396,
        "Group E": 138,
        "Group F": 436,
    },
    {
        topic: "Topic 2",
        "Group A": 289,
        "Group B": 233,
        "Group C": 253,
        "Group D": 333,
        "Group E": 133,
        "Group F": 533,
    },
];
const CartPage: NextPageWithLayout = () => {
    const { loginUser } = useAuth();
    const router = useRouter();
    const cart = useCartStore(state => state.cart);
    const getGroupedByCampaignCart = useCartStore(state => state.getGroupedByCampaignCart);

    const setOrderType = useOrderStore(state => state.setOrderType);
    const setOrderItems = useOrderStore(state => state.setOrderItems);
    const orderItems = useOrderStore(state => state.orderItems);

    const [selectedItems, setSelectedItems] = useState<ICartItem[]>([]);

    const [showOrderTypesModal, setShowOrderTypesModal] = useState<boolean>(false);


    const onSelectedChange = (item: ICartItem, value: boolean) => {
        if (value) {
            if (selectedItems.length === 0) {
                setSelectedItems([item]);
            } else {
                const campaignId = selectedItems[0]?.product?.campaign?.id;
                if (campaignId === item?.product?.campaign?.id) {
                    setSelectedItems([...selectedItems, item]);
                } else {
                    setSelectedItems([item]);
                }
            }
        } else {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem?.product?.id !== item?.product?.id));
        }
    };

    const notifyItemChange = (item: ICartItem) => {
        if (selectedItems.some((selectedItem) => selectedItem?.product?.id === item?.product?.id)) {
            setSelectedItems(selectedItems.map((selectedItem) => {
                if (selectedItem?.product?.id === item?.product?.id) {
                    return item;
                }
                return selectedItem;
            }));
        }
    };


    const orderCalculationService = new OrderCalculationService();
    const cartCalcRequestParams = useMemo(() => getOrderParams(selectedItems), [selectedItems]);
    console.log("cartCalcRequestParams", cartCalcRequestParams);
    const debouncedCartCalcRequestParams = useDebounce(cartCalcRequestParams, 500);

    const {
        data: cartCalculation,
        isInitialLoading: isCartCalculationLoading,
    } = useQuery(["cart_calculation", debouncedCartCalcRequestParams],
        () => orderCalculationService.getCartCalculation(debouncedCartCalcRequestParams),
        {
            enabled: debouncedCartCalcRequestParams.orderDetails.length > 0,
            onError: (error: any) => {
                setSelectedItems([]);
                toast.error(error?.message || "Có lỗi xảy ra, vui lòng chọn sản phẩm khác hoặc thử lại sau");
            },
        },
    );

    const handlePlaceOrder = async () => {
        if (selectedItems.length === 0) {
            return;
        }
        setOrderItems(selectedItems);

        console.log("orderItems", orderItems);

        const campaign = selectedItems[0]?.product?.campaign;
        if (campaign?.format === CampaignFormats.OFFLINE.id) {
            setShowOrderTypesModal(true);
        } else if (campaign?.format === CampaignFormats.ONLINE.id) {
            setOrderType("delivery");
            await router.push("/checkout");
        }
    };

    return (
        <Fragment>
            <h1 className="text-3xl font-bold tracking-tight text-slate-700 sm:text-4xl">
                Giỏ hàng
            </h1>
            {cart?.length > 0 ?
                <div
                    className="mt-10 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
                >
                    <section
                        aria-labelledby="cart-heading"
                        className="space-y-6 lg:col-span-7"
                    >
                        {getGroupedByCampaignCart(cart)?.map((item) => {
                            const allSelected = item.items?.every((cartItem) => selectedItems.some((selectedItem) => selectedItem?.product?.id === cartItem?.product?.id));
                            return <div key={item.campaign?.id}>
                                <div
                                    className="mb-2 flex items-center justify-between gap-2 bg-white shadow-sm border py-3 px-6 rounded">
                                    <Link
                                        href={`/campaigns/${item.campaign?.id}`}
                                        className="text-lg font-medium text-slate-700 hover:text-slate-800 hover:underline underline-offset-2"
                                    >
                                        {item.campaign?.name}
                                    </Link>
                                    <div>
                                        <input
                                            id={`cart-${item.campaign?.id}`}
                                            checked={allSelected}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedItems([...item.items]);
                                                } else {
                                                    setSelectedItems([]);
                                                }
                                            }}
                                            type="checkbox"
                                            className="h-4 w-4 rounded-full border-gray-300 text-blue-600"
                                        />
                                        <label htmlFor={`cart-${item.campaign?.id}`}
                                               className="ml-2 text-sm text-gray-500">
                                            Chọn tất cả
                                        </label>
                                    </div>
                                </div>
                                <ul
                                    role="list"
                                    className="divide-y divide-gray-200  border-gray-200"
                                >
                                    {item.items?.map((cartItem) => {
                                        const isSelected = selectedItems?.findIndex((item) => item?.product?.id === cartItem?.product?.id) !== -1;
                                        return <CartItem
                                            isSelected={isSelected}
                                            notifyChange={notifyItemChange}
                                            onSelectedChange={onSelectedChange}
                                            key={cartItem?.product?.id}
                                            cartItem={cartItem}
                                            onRemove={() => {
                                                setSelectedItems(selectedItems.filter((selectedItem) => selectedItem?.product?.id !== cartItem?.product?.id));
                                            }}
                                        />;
                                    })}
                                </ul>

                            </div>;
                        })}
                    </section>

                    {/* Order summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 rounded-lg border bg-gray-50 px-4 py-6 sm:p-6 lg:sticky lg:top-20 lg:col-span-5 lg:mt-0 lg:p-8"
                    >
                        <h2
                            id="summary-heading"
                            className="text-lg font-medium text-gray-900"
                        >
                            Tóm tắt đơn hàng
                        </h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between ">
                                <dt className="text-sm font-medium text-gray-700">
                                    Tạm tính
                                </dt>

                                {/*Skeleton*/}

                                {isCartCalculationLoading ?
                                    <dd className={"animate-pulse"}>
                                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                                    </dd>
                                    :
                                    <dd className="text-sm font-medium text-gray-900">
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(
                                            cartCalculation?.subTotal || 0,
                                        )}
                                    </dd>
                                }
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex text-sm font-medium text-gray-700">
                                    <span>Phí tạm tính</span>
                                    {/*<a*/}
                                    {/*    href="#"*/}
                                    {/*    className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"*/}
                                    {/*>*/}
                                    {/*    <HiQuestionMarkCircle*/}
                                    {/*        className="h-5 w-5"*/}
                                    {/*        aria-hidden="true"*/}
                                    {/*    />*/}
                                    {/*</a>*/}
                                </dt>
                                {isCartCalculationLoading ?
                                    <dd className={"animate-pulse"}>
                                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                                    </dd>
                                    :
                                    <dd className="text-sm font-medium text-gray-900">
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(
                                            cartCalculation?.freight || 0,
                                        )}
                                    </dd>
                                }
                            </div>
                            <div className="flex items-center justify-between ">
                                <dt className="text-sm font-medium text-gray-700">
                                    Giảm giá
                                </dt>
                                {isCartCalculationLoading ?
                                    <dd className={"animate-pulse"}>
                                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                                    </dd>
                                    :
                                <dd className="text-sm font-medium text-gray-900">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(
                                        cartCalculation?.discountTotal || 0,
                                    )}
                                </dd>
                                }
                            </div>
                            {/*<div className="border-t border-gray-200 pt-4">*/}
                            {/*    <dt className=" text-base font-medium text-gray-700">*/}
                            {/*        Hình thức nhận hàng*/}
                            {/*    </dt>*/}
                            {/*    <div className={"mt-3"}>*/}
                            {/*        <div className="flex items-center gap-2">*/}
                            {/*            <input*/}

                            {/*                className="hidden"*/}
                            {/*                type="radio"*/}
                            {/*                id={"pickup-order"}*/}
                            {/*            />*/}
                            {/*            <label*/}
                            {/*                className={"text-gray-700"}*/}
                            {/*                htmlFor={"pickup-order"}*/}
                            {/*            >*/}
                            {/*                Nhận tại sự kiện*/}
                            {/*            </label>*/}
                            {/*        </div>*/}
                            {/*        <div className="mt-2 flex items-center gap-2">*/}
                            {/*            <input*/}
                            {/*                className="hidden"*/}
                            {/*                type="radio"*/}
                            {/*                id={"ship-order"}*/}
                            {/*            />*/}
                            {/*            <label*/}
                            {/*                className={"text-gray-700"}*/}
                            {/*                htmlFor={"ship-order"}*/}
                            {/*            >*/}
                            {/*                Giao hàng*/}
                            {/*            </label>*/}
                            {/*        </div>*/}


                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="text-base font-medium text-gray-900">
                                    Tổng cộng
                                </dt>
                                {isCartCalculationLoading ?
                                    <dd className={"animate-pulse"}>
                                        <div className="h-6 bg-gray-200 rounded w-24"></div>
                                    </dd>
                                    :
                                <dd className="text-lg font-semibold text-gray-900">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(
                                        cartCalculation?.total || 0,
                                    )}
                                </dd>
                                }
                            </div>
                        </dl>


                        {(loginUser?.accessToken && cartCalculation?.plusPoint) ? (
                            <div className="mt-6">
                                Bạn sẽ nhận được <span className={"font-semibold"}>{
                                new Intl.NumberFormat("vi-VN").format(cartCalculation?.plusPoint || 0)
                            }</span> điểm tích lũy khi đặt hàng
                            </div>
                        ) : null}

                        <div className="mt-6">
                            <button
                                onClick={handlePlaceOrder}
                                disabled={isCartCalculationLoading || !selectedItems?.length || !cartCalculation}
                                type="submit"
                                className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Mua
                                hàng {!isCartCalculationLoading && cartCalculation?.orderDetails && cartCalculation?.orderDetails?.length > 0 ? `(${cartCalculation?.orderDetails?.length})` : null}
                            </button>
                        </div>
                    </section>
                </div>

                : <div className={"mt-16"}>
                    <GiShoppingBag className={"mx-auto h-24 w-24 text-gray-400"} />
                    <h2 className={"mt-4 text-center text-2xl font-semibold text-gray-500"}>
                        Giỏ hàng trống
                    </h2>
                    <p className={"mt-1 text-center text-gray-400"}>
                        Bạn chưa có sản phẩm nào trong giỏ hàng
                    </p>
                    <div className={"mt-6 text-center"}>
                        <Link href={"/products"}
                              className={"text-center text-base font-medium text-indigo-600 hover:text-indigo-500"}>
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                </div>}
            <SelectOrderPlacementTypeModal isOpen={showOrderTypesModal} onClose={() => {
                setOrderItems([]);
                setShowOrderTypesModal(false);
            }} />

        </Fragment>
    );
};

CartPage.getLayout = (page) => {
    return <CustomerLayout>
        {page}
    </CustomerLayout>;
};

export default CartPage;
=======
import React, { FormEvent, useEffect, useState } from 'react';
import { NextPage } from 'next';
import MainLayout from '../../components/Layouts/MainLayout';
import { useAuth } from '../../context/AuthContext';
import EmptyCart from '../../components/Cart/EmptyCart';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { PostService } from '../../services/PostService';
import { IPostResponse } from '../../types/response/IPostResponse';
import CartRow from '../../components/Cart/CartRow';
import { IoTrash } from 'react-icons/io5';
import Swal from 'sweetalert2';
import { getFormattedPrice, isValidPhoneNumber } from '../../utils/helper';
import { IOrder } from '../../types/order/IOrder';
import { addDays } from 'date-fns';
import { toast } from 'react-toastify';
import { OrderService } from '../../services/OrderService';
import { useRouter } from 'next/router';

const CartPage: NextPage = () => {
    const { loginUser, cart, handleClearCartByCampaignId, handleClearCart } =
        useAuth();

    const [campaignIds, setCampaignIds] = useState<number[]>([]);
    const [checkedCampaignId, setCheckedCampaignId] = useState<number>();
    const router = useRouter();
    const queryClient = useQueryClient();
    const postService = new PostService(loginUser?.accessToken);
    const orderService = new OrderService(loginUser?.accessToken);
    const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'ship'>(
        'pickup'
    );
    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const getAllQueries = useQueries({
        queries: cart.map((item) => ({
            queryKey: ['cart_item', item.campaignBookId],
            queryFn: () => postService.getPostById(item.postId),
        })),
    });

    useEffect(() => {
        setCampaignIds(
            Array.from(new Set(cart.map((item) => item.campaignId)))
        );
    }, [cart]);

    useEffect(() => {
        if (campaignIds.length === 1) {
            setCheckedCampaignId(campaignIds[0]);
        }
    }, [campaignIds]);

    const getPost = (campaignBookId: number | undefined) => {
        return queryClient.getQueryData<IPostResponse>([
            'cart_item',
            campaignBookId,
        ]);
    };

    const handlePlaceOrder = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!checkedCampaignId) {
            toast.error('Vui lòng chọn giỏ hàng từ một sự kiện để đặt hàng');
            return;
        }

        if (deliveryMethod === 'ship' && !address.trim()) {
            toast.error('Vui lòng nhập địa chỉ giao hàng');
            return;
        }
        if (deliveryMethod === 'ship' && !phone.trim()) {
            toast.error('Vui lòng nhập số điện thoại');
            return;
        }

        if (deliveryMethod === 'ship' && !isValidPhoneNumber(phone)) {
            toast.error('Số điện thoại không hợp lệ');
            return;
        }

        const payload: IOrder = {
            campaignId: checkedCampaignId,
            customerId: loginUser?.userId,
            address,
            total: getTotalPrice(),
            freight: 0,
            payment: 'COD',
            orderDate: new Date().toJSON(),
            requiredDate: addDays(new Date(), 7).toJSON(),
            shippedDate: addDays(new Date(), 7).toJSON(),
            orderDetails: cart
                .filter((i) => i.campaignId === checkedCampaignId)
                .map((item) => {
                    const post = getPost(item.campaignBookId);
                    const campaignBook = post?.campaignBooks[0];
                    const book = campaignBook?.book;
                    return {
                        campaignBookId: item.campaignBookId,
                        quantity: item.quantity,
                        price:
                            campaignBook?.coverPrice && book?.price
                                ? campaignBook?.coverPrice + book?.price
                                : 0,
                    };
                }),
        };

        switch (deliveryMethod) {
            case 'pickup':
                orderService.createPickUpOrder(payload).then((res) => {
                    if (res) {
                        Swal.fire({
                            title: 'Đặt hàng thành công',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        }).then(() => {
                            handleClearCartByCampaignId(checkedCampaignId);
                            router.push('/orders');
                        });
                    }
                });
                break;
            case 'ship':
                orderService.createShipOrder(payload).then((res) => {
                    if (res) {
                        Swal.fire({
                            title: 'Đặt hàng thành công',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        }).then(() => {
                            handleClearCartByCampaignId(checkedCampaignId);
                            router.push('/orders');
                        });
                    }
                });
                break;
        }
    };

    const getTotalPrice = () => {
        if (!checkedCampaignId) return 0;
        let total = 0;
        cart.filter((i) => i.campaignId === checkedCampaignId).forEach(
            (item) => {
                const post = getPost(item.campaignBookId);
                const campaignBook = post?.campaignBooks[0];
                const book = campaignBook?.book;
                if (campaignBook?.coverPrice && book?.price) {
                    total +=
                        item.quantity *
                        (campaignBook?.coverPrice + book?.price);
                }
            }
        );
        return total;
    };

    const clearCart = (campaignId: number) => {
        Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: 'Tất cả các sản phẩm trong giỏ hàng sẽ bị xóa!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                handleClearCartByCampaignId(campaignId);
                Swal.fire({
                    title: 'Đã xoá!',
                    text: 'Giỏ hàng của bạn đã được xoá.',
                    icon: 'success',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1500,
                });
            }
        });
    };

    return (
        <MainLayout maxWidth={'max-w-6xl'}>
            {cart?.length === 0 ? (
                <EmptyCart />
            ) : (
                <div className="bg-white px-4 pt-8 pb-14 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
                        Giỏ hàng
                    </h1>

                    <form
                        onSubmit={(e) => handlePlaceOrder(e)}
                        className="mt-10 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
                    >
                        <section
                            aria-labelledby="cart-heading"
                            className="space-y-6 lg:col-span-7"
                        >
                            {campaignIds?.map((campaignId) => (
                                <div key={campaignId}>
                                    <div className="mb-2 flex items-center gap-2">
                                        <input
                                            id={`cart-${campaignId}`}
                                            checked={
                                                checkedCampaignId === campaignId
                                            }
                                            onChange={() =>
                                                setCheckedCampaignId(campaignId)
                                            }
                                            className="h-5 w-5 rounded-full border-gray-300 text-blue-600"
                                            type="checkbox"
                                        />
                                        <label
                                            className="text-lg font-medium text-blue-800"
                                            htmlFor={`cart-${campaignId}`}
                                        >
                                            {
                                                getPost(
                                                    cart.find(
                                                        (c) =>
                                                            c.campaignId ===
                                                            campaignId
                                                    )?.campaignBookId
                                                )?.campaign?.name
                                            }
                                        </label>
                                    </div>
                                    <button
                                        onClick={() => clearCart(campaignId)}
                                        type="button"
                                        className="ml-auto flex items-center gap-1.5 rounded-tl-md bg-gray-50 px-2.5 py-1 font-medium text-slate-700"
                                    >
                                        <IoTrash />
                                        <span>Xoá giỏ hàng</span>
                                    </button>
                                    {getAllQueries.some((q) => q.isLoading) ? (
                                        <div>Đang tải...</div>
                                    ) : (
                                        <ul
                                            role="list"
                                            className="divide-y divide-gray-200 border-t border-b border-gray-200"
                                        >
                                            {cart
                                                .filter(
                                                    (item) =>
                                                        item.campaignId ===
                                                        campaignId
                                                )
                                                ?.map((cartItem) => (
                                                    <CartRow
                                                        key={
                                                            cartItem.campaignBookId
                                                        }
                                                        cartItem={cartItem}
                                                        data={getPost(
                                                            cartItem.campaignBookId
                                                        )}
                                                    />
                                                ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </section>

                        {/* Order summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-lg border bg-gray-50 px-4 py-6 sm:p-6 lg:sticky lg:top-20 lg:col-span-5 lg:mt-0 lg:p-8"
                        >
                            <h2
                                id="summary-heading"
                                className="text-lg font-medium text-gray-900"
                            >
                                Tóm tắt đơn hàng
                            </h2>

                            <dl className="mt-6 space-y-4">
                                <div className="flex items-center justify-between ">
                                    <dt className="text-sm font-medium text-gray-700">
                                        Tạm tính
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900">
                                        {getFormattedPrice(getTotalPrice())}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="flex text-sm font-medium text-gray-700">
                                        <span>Phí dịch vụ</span>
                                        <a
                                            href="#"
                                            className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                                        >
                                            <HiQuestionMarkCircle
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </a>
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900">
                                        {getFormattedPrice(0)}
                                    </dd>
                                </div>
                                <div className="border-t border-gray-200 pt-4">
                                    <dt className=" text-base font-medium text-gray-700">
                                        Hình thức nhận hàng
                                    </dt>
                                    <div className={'mt-3'}>
                                        <div className="flex items-center gap-2">
                                            <input
                                                onChange={() =>
                                                    setDeliveryMethod('pickup')
                                                }
                                                checked={
                                                    deliveryMethod === 'pickup'
                                                }
                                                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                                type="radio"
                                                id={'pickup-order'}
                                            />
                                            <label
                                                className={'text-gray-700'}
                                                htmlFor={'pickup-order'}
                                            >
                                                Nhận tại sự kiện
                                            </label>
                                        </div>
                                        <div className="mt-2 flex items-center gap-2">
                                            <input
                                                onChange={() =>
                                                    setDeliveryMethod('ship')
                                                }
                                                checked={
                                                    deliveryMethod === 'ship'
                                                }
                                                className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                                type="radio"
                                                id={'ship-order'}
                                            />
                                            <label
                                                className={'text-gray-700'}
                                                htmlFor={'ship-order'}
                                            >
                                                Giao hàng
                                            </label>
                                        </div>

                                        {deliveryMethod === 'ship' && (
                                            <>
                                                <div className={'mt-2'}>
                                                    <label
                                                        htmlFor="first-name"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Địa chỉ
                                                    </label>
                                                    <input
                                                        disabled={
                                                            deliveryMethod !==
                                                            'ship'
                                                        }
                                                        value={address}
                                                        onChange={(e) =>
                                                            setAddress(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 sm:text-sm"
                                                        type="text"
                                                    />
                                                </div>
                                                <div className={'mt-2'}>
                                                    <label
                                                        htmlFor="first-name"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Số điện thoại
                                                    </label>
                                                    <input
                                                        disabled={
                                                            deliveryMethod !==
                                                            'ship'
                                                        }
                                                        value={phone}
                                                        onChange={(e) =>
                                                            setPhone(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 sm:text-sm"
                                                        type="text"
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="text-base font-medium text-gray-900">
                                        Tổng cộng
                                    </dt>
                                    <dd className="text-lg font-semibold text-gray-900">
                                        {getFormattedPrice(getTotalPrice())}
                                    </dd>
                                </div>
                            </dl>

                            <div className="mt-6">
                                <button
                                    disabled={!checkedCampaignId}
                                    type="submit"
                                    className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Đặt hàng
                                </button>
                            </div>
                        </section>
                    </form>
                </div>
            )}
        </MainLayout>
    );
};

export default CartPage;
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb

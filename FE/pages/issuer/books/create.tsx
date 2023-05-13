<<<<<<< HEAD
import React, { Fragment, ReactElement, useState } from "react";
import AdminLayout from "../../../components/Layout/AdminLayout";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../_app";
import { useAuth } from "../../../context/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthorService } from "../../../old-services/AuthorService";
import { CategoryService } from "../../../old-services/System/CategoryService";
import { IssuerBookService } from "../../../old-services/Issuer/Issuer_BookService";
import { PublisherService } from "../../../old-services/System/PublisherService";
import Multiselect from "multiselect-react-dropdown";
import DynamicForm from "./../../../components/DynamicForm";
import CreateButton from "../../../components/Admin/CreateButton";
import AuthorModal, {
    AuthorModalMode,
} from "../../../components/Modal/AuthorModal";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";

import { BookService } from "./../../../services/BookService";
import { ImageUploadService } from "./../../../services/ImageUploadService";
import { LanguageService } from "./../../../services/LanguageService";
import { GenreService } from "./../../../services/GenreService";
import SelectAuthorModal from "./../../../components/SelectAuthor/SelectAuthorModal";
import SelectAuthorTable from "./../../../components/SelectAuthor/SelectAuthorTable";
import { IAuthor } from "./../../../types/Author/IAuthor";
import ErrorMessage from "./../../../components/Form/ErrorMessage";

const IssuerCreateBookPage: NextPageWithLayout = () => {
    const { loginUser } = useAuth();
    const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
=======
import React, { useState } from 'react';
import { NextPage } from 'next';
import AdminLayout from '../../../components/Layouts/AdminLayout';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../utils/firebase/initFirebase';
import { useRouter } from 'next/router';
import { PublisherService } from '../../../services/PublisherService';
import { useAuth } from '../../../context/AuthContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthorService } from '../../../services/AuthorService';
import { CategoryService } from '../../../services/CategoryService';
import { IssuerBookService } from '../../../services/Issuer/Issuer_BookService';

const IssuerCreateBookPage: NextPage = () => {
    const { loginUser } = useAuth();
    const [coverPhoto, setCoverPhoto] = useState<File | null>(null);

    const [selectedPublisherId, setSelectedPublisherId] = useState<
        string | null
    >(null);
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
    const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(
        null
    );

<<<<<<< HEAD
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
    const [showauthorselectModal, setShowAuthorSelectModal] =
        useState<boolean>(false);

    const languageService = new LanguageService();
    const genreService = new GenreService();
    const publisherService = new PublisherService(loginUser?.accessToken);
    const authorService = new AuthorService(loginUser?.accessToken);
    // const categoryService = new CategoryService(loginUser?.accessToken);
    // const bookService = new IssuerBookService(loginUser?.accessToken);
    const bookService = new BookService(loginUser?.accessToken);

    const { data: books } = useQuery(["books"], () =>
        bookService.getBooksByIssuer({
            size: 1000,
        })
    );
    const { data: publishers } = useQuery(["publisher"], () =>
=======
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
        null
    );

    const publisherService = new PublisherService(loginUser?.accessToken);
    const authorService = new AuthorService(loginUser?.accessToken);
    const categoryService = new CategoryService(loginUser?.accessToken);
    const bookService = new IssuerBookService(loginUser?.accessToken);

    const { data: publishers } = useQuery(['publisher'], () =>
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
        publisherService.getPublishers({
            size: 1000,
        })
    );
<<<<<<< HEAD
    const { data: authors } = useQuery(["authors"], () =>
=======
    const { data: authors } = useQuery(['authors'], () =>
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
        authorService.getAuthors({
            size: 1000,
        })
    );
<<<<<<< HEAD
    const { data: languages } = useQuery(["languages"], () =>
        languageService.getLanguages()
    );
    const { data: genres } = useQuery(["genres"], () =>
        genreService.getChildGenres({})
    );

    const [selectedAuthor, setSelectedAuthor] = useState<{
        id?: number;
        name?: string;
    }>();
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    // const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
    const router = useRouter();

    // const firebaseUploadPromise = (file: File) => {
    //   return new Promise((resolve, reject) => {
    //     const fileName =
    //       Math.random().toString(36).substring(2, 15) +
    //       Math.random().toString(36).substring(2, 15);
    //     // get file extension
    //     const fileExtension = file.name.split('.').pop();
    //     const storageRef = ref(
    //       storage,
    //       `images/${fileName}.${fileExtension}`
    //     );
    //     const task = uploadBytesResumable(storageRef, file);
    //     task.on(
    //       'state_changed',
    //       (snapshot) => { },
    //       (error) => {
    //         reject(error);
    //       },
    //       () => {
    //         getDownloadURL(task.snapshot.ref)
    //           .then((url) => {
    //             resolve(url);
    //           })
    //           .catch((err) => {
    //             reject(err);
    //           });
    //       }
    //     );
    //   });
    // };
=======

    const { data: categories } = useQuery(['categories'], () =>
        categoryService.getCategories({
            size: 1000,
        })
    );
    const router = useRouter();

    const createBookMutation = useMutation(
        (values: any) => bookService.createBook$Issuer(values),
        {
            onSuccess: () => {
                toast.success('Tạo sách thành công');
                router.push('/issuer/books');
            },
            onError: (error: any) => {
                toast.error(error?.message);
            },
        }
    );

    const firebaseUploadPromise = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileName =
                Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15);
            // get file extension
            const fileExtension = file.name.split('.').pop();
            const storageRef = ref(
                storage,
                `images/${fileName}.${fileExtension}`
            );
            const task = uploadBytesResumable(storageRef, file);
            task.on(
                'state_changed',
                (snapshot) => {},
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(task.snapshot.ref)
                        .then((url) => {
                            resolve(url);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }
            );
        });
    };
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb

    const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // check file type
<<<<<<< HEAD
            if (!file.type.startsWith("image/")) {
                toast.error("Vui lòng tải lên tệp hình ảnh");
=======
            if (!file.type.startsWith('image/')) {
                toast.error('Vui lòng tải lên tệp hình ảnh');
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                return;
            }
            // check file size
            if (file.size > 1024 * 1024 * 1) {
<<<<<<< HEAD
                toast.error("Kích thước tệp tối đa là 1MB");
=======
                toast.error('Kích thước tệp tối đa là 1MB');
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                return;
            }
            setCoverPhoto(file);
        }
    };

<<<<<<< HEAD
    const handleAddAuthor = (author: IAuthor) => {
        const currentAuthors = form.values.authors;
        const newAuthors = [...currentAuthors, author];
        console.log(newAuthors);

        form.setFieldValue("authors", newAuthors);
    };
    const handleRemoveAuthor = (org: IAuthor) => {
        form.setFieldValue(
            "authors",
            form.values.authors.filter((o: IAuthor) => o?.id !== org?.id)
        );
    };

    const imageService = new ImageUploadService(loginUser?.accessToken);
    const uploadImageMutation = useMutation((file: File) =>
        imageService.uploadImage(file)
    );

    const createBookMutation = useMutation((values: any) =>
        bookService.createBookByIssuer(values)
    );

    const form = useFormik({
        initialValues: {
            code: "",
            isbn10: "",
            isbn13: "",
            name: "",
            translator: "",
            coverPrice: 0,
            description: "",
            language: "",
            size: "",
            pdfExtraPrice: 0,
            pdfTrialUrl: "",
            audioExtraPrice: 0,
            audioTrialUrl: "",
=======
    const form = useFormik({
        initialValues: {
            code: '',
            isbn10: '',
            isbn13: '',
            name: '',
            translator: '',
            price: 0,
            description: '',
            language: '',
            size: '',
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
            unitInStock: 0,
            releasedYear: new Date().getFullYear(),
            page: 1,
            bookInCombo: true,
<<<<<<< HEAD
            authors: [],
            publisherId: undefined,
            genreId: undefined,
        },
        validationSchema: Yup.object().shape({
            authors: Yup.array(
                Yup.object().shape({
                    id: Yup.number(),
                    name: Yup.string().max(
                        255,
                        "Tên sách không được vượt quá 255 ký tự"
                    ),
                })
            ).required("Tác giả không được để trống"),
            code: Yup.string().required("Mã sách không được để trống"),
            isbn10: Yup.string().max(50, "ISBN10 không được vượt quá 50 ký tự"),
            isbn13: Yup.string().max(50, "ISBN13 không được vượt quá 50 ký tự"),
            name: Yup.string().required("Tên sách không được để trống"),
            translator: Yup.string(),
            coverPrice: Yup.number()
                .required("Giá không được để trống")
                .min(0, "Giá không được nhỏ hơn 0"),
            description: Yup.string().required("Mô tả không được để trống"),
            language: Yup.string()
                .required("Ngôn ngữ không được để trống")
                .max(255, "Ngôn ngữ không được vượt quá 255 ký tự"),
            size: Yup.string()
                .required("Kích thước không được để trống")
                .max(255, "Kích thước không được vượt quá 255 ký tự"),
            // unitInStock: Yup.number()
            //   .required("Số lượng không được để trống")
            //   .integer("Số lượng phải là số nguyên")
            //   .min(0, "Số lượng không được nhỏ hơn 0"),
            releasedYear: Yup.number()
                .required("Năm phát hành không được để trống")
                .integer("Năm phát hành phải là số nguyên")
                .min(2010, "Năm phát hành không được nhỏ hơn 2010")
                .max(
                    new Date().getFullYear(),
                    "Năm phát hành không được lớn hơn năm hiện tại"
                ),
            page: Yup.number()
                .required("Số trang không được để trống")
                .min(1, "Số trang không được nhỏ hơn 1"),
            publisherId: Yup.number().required(
                "Nhà xuất bản không được để trống"
            ),
            genreId: Yup.number().required("Thể loại không được để trống"),
        }),
        onSubmit: async (values) => {
            // if (coverPhoto === null) {
            //   toast.error("Vui lòng chọn ảnh bìa");
            //   return;
            // }

            // if (!selectedAuthorId) {
            //   toast.error("Vui lòng chọn tác giả");
            //   return;
            // }
            // if (!selectedPublisherId) {
            //   toast.error("Vui lòng chọn nhà xuất bản");
            //   return;
            // }
            // if (!selectedCategoryId) {
            //   toast.error("Vui lòng chọn thể loại");
            //   return;
            // }

            // // upload cover photo to firebase
            //
            // firebaseUploadPromise(coverPhoto)
            //   .then(async (url) => {
            //     payload.imageUrl = url as string;
            //     createBookMutation.mutate(payload);
            //   })
            //   .catch((err) => {
            //     toast.error("Có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại");
            //   });

            // const createBookMutation = useMutation(
            //   (values: any) => bookService.createBookByIssuer(values),
            //   {
            //     onSuccess: () => {
            //       toast.success('Tạo sách thành công');
            //       router.push('/issuer/books');
            //     },
            //     onError: (error: any) => {
            //       toast.error(error?.message);
            //     },
            //   }
            // )

            let payload = {
                ...values,
                authors: values.authors.map((a: IAuthor) => a.id),
                audioTrialUrl: values.audioTrialUrl || null,
                pdfTrialUrl: values.pdfTrialUrl || null,
                pdfExtraPrice:
                    values.pdfExtraPrice <= 0 ? null : values.pdfExtraPrice,
                audioExtraPrice:
                    values.audioExtraPrice <= 0 ? null : values.audioExtraPrice,
                imageUrl: "",
            };

            if (!coverPhoto) {
                toast.error("Vui lòng chọn ảnh bìa");
                return;
            }
            try {
                await toast.promise(
                    uploadImageMutation.mutateAsync(coverPhoto),
                    {
                        loading: "Đang tải ảnh lên",
                        success: (data) => {
                            payload.imageUrl = data?.url || "";
                            return "Tải ảnh lên thành công";
                        },
                        error: (err) => err?.message || "Tải ảnh lên thất bại",
                    }
                );
            } catch (err) {
                console.log(err);
                return;
            }

            async function createBookWithToast(promise: Promise<any>) {
                await toast.promise(promise, {
                    loading: "Đang tạo sách lẻ",
                    success: (data) => {
                        if (data?.id) {
                            router.push(`/issuer/books`);
                        }
                        return "Tạo sách lẻ thành công";
                    },
                    error: (error) => {
                        return error?.message || "Tạo sách lẻ thất bại";
                    },
                });
            }

            console.log(payload);

            try {
                await createBookWithToast(
                    createBookMutation.mutateAsync(payload)
                );
            } catch (error) {
                console.log(error);
            }

            // createBookWithToast(createBookMutation.mutateAsync(payload));
        },
    });

    console.log(form.errors);
    return (
        <Fragment>
            <form
                onSubmit={form.handleSubmit}
                className="mx-auto max-w-6xl space-y-8 bg-white p-10"
            >
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
                        Thêm sách lẻ ✨
                    </h1>
                </div>
                <div className="mb-6">
                    <Link
                        className="flex w-fit items-center justify-between rounded border-slate-200 bg-slate-100 px-3.5 py-1.5 text-base font-medium text-slate-600 transition duration-150 ease-in-out hover:border-slate-300 hover:bg-slate-200"
                        href="/issuer/books"
                    >
                        <IoChevronBack size={"17"} />
                        <span>Quay lại</span>
                    </Link>
                </div>
                <div className="space-y-8">
                    <div>
                        <div>
                            <h3 className="text-lg font-bold leading-6 text-gray-900">
=======
        },
        validationSchema: Yup.object().shape({
            code: Yup.string().required('Mã sách không được để trống'),
            isbn10: Yup.string()
                .required('ISBN10 không được để trống')
                .length(10, 'ISBN10 phải có 10 ký tự'),
            isbn13: Yup.string()
                .required('ISBN13 không được để trống')
                .length(13, 'ISBN13 phải có 13 ký tự'),
            name: Yup.string().required('Tên sách không được để trống'),
            translator: Yup.string().required(
                'Tên dịch giả không được để trống'
            ),
            price: Yup.number()
                .required('Giá không được để trống')
                .min(0, 'Giá không được nhỏ hơn 0'),
            description: Yup.string().required('Mô tả không được để trống'),
            language: Yup.string().required('Ngôn ngữ không được để trống'),
            size: Yup.string().required('Kích thước không được để trống'),
            unitInStock: Yup.number()
                .required('Số lượng không được để trống')
                .integer('Số lượng phải là số nguyên')
                .min(0, 'Số lượng không được nhỏ hơn 0'),
            releasedYear: Yup.number()
                .required('Năm xuất bản không được để trống')
                .integer('Năm xuất bản phải là số nguyên')
                .min(2010, 'Năm xuất bản không được nhỏ hơn 2010')
                .max(
                    new Date().getFullYear(),
                    'Năm xuất bản không được lớn hơn năm hiện tại'
                ),

            page: Yup.number()
                .required('Số trang không được để trống')
                .min(1, 'Số trang không được nhỏ hơn 1'),
        }),
        onSubmit: async (values) => {
            if (coverPhoto === null) {
                toast.error('Vui lòng chọn ảnh bìa');
                return;
            }

            if (!selectedAuthorId) {
                toast.error('Vui lòng chọn tác giả');
                return;
            }
            if (!selectedPublisherId) {
                toast.error('Vui lòng chọn nhà xuất bản');
                return;
            }
            if (!selectedCategoryId) {
                toast.error('Vui lòng chọn thể loại');
                return;
            }

            let payload = {
                ...values,
                authors: [Number(selectedAuthorId)],
                categoryId: Number(selectedCategoryId),
                publisherId: Number(selectedPublisherId),
            };
            // // upload cover photo to firebase
            //
            firebaseUploadPromise(coverPhoto)
                .then(async (url) => {
                    payload.imageUrl = url as string;
                    createBookMutation.mutate(payload);
                })
                .catch((err) => {
                    toast.error(
                        'Có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại'
                    );
                });
        },
    });

    return (
        <AdminLayout>
            <form
                onSubmit={form.handleSubmit}
                className="mx-auto max-w-6xl space-y-8 divide-y divide-gray-200 bg-white p-10"
            >
                <div className="space-y-8 divide-y divide-gray-200">
                    <div>
                        <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                                Thông tin chung
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Thông tin cơ bản về sách
                            </p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
<<<<<<< HEAD
                            <div className="sm:col-span-2">
=======
                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Tên sách
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.name}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.name && form.touched.name && (
                                    <div className={'input-error'}>
                                        {form.errors.name}
                                    </div>
                                )}
                            </div>

                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="code"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Mã sách
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.code}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="code"
                                        id="code"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.code && form.touched.code && (
                                    <div className={'input-error'}>
                                        {form.errors.code}
                                    </div>
                                )}
                            </div>

                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Mô tả
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        value={form.values.description}
                                        onChange={form.handleChange}
                                        id="description"
                                        name="description"
                                        rows={3}
                                        className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.description &&
                                    form.touched.description && (
                                        <div className={'input-error'}>
                                            {form.errors.description}
                                        </div>
                                    )}
                            </div>

                            <div className="sm:col-span-6">
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                                <label
                                    htmlFor="cover-photo"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Ảnh bìa
<<<<<<< HEAD
                                    <span className="text-rose-500">*</span>
=======
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                                </label>
                                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    <div className="space-y-1 text-center">
                                        {coverPhoto ? (
                                            <Image
                                                className={
<<<<<<< HEAD
                                                    "mb-4 w-40 rounded-md object-cover object-center"
=======
                                                    'mb-4 w-52 rounded-md object-cover object-center'
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                                                }
                                                width={500}
                                                height={500}
                                                src={URL.createObjectURL(
                                                    coverPhoto
                                                )}
<<<<<<< HEAD
                                                alt={""}
=======
                                                alt={''}
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                                            />
                                        ) : (
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                        <div className="flex justify-center text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>
                                                    {coverPhoto
<<<<<<< HEAD
                                                        ? "Chọn ảnh khác"
                                                        : "Tải ảnh lên"}
=======
                                                        ? 'Chọn ảnh khác'
                                                        : 'Tải ảnh lên'}
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                                                </span>
                                                <input
                                                    onChange={(e) =>
                                                        handleCoverPhotoChange(
                                                            e
                                                        )
                                                    }
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF tối đa 1MB
                                        </p>
                                    </div>
                                </div>
                            </div>
<<<<<<< HEAD
                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Tên sách
                                    <span className="text-rose-500">*</span>
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.name}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.name && form.touched.name && (
                                    <div className={"input-error"}>
                                        {form.errors.name}
                                    </div>
                                )}
                                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="code"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Mã sách
                                            <span className="text-rose-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                placeholder="VD: TB001"
                                                value={form.values.code}
                                                onChange={form.handleChange}
                                                type="text"
                                                name="code"
                                                id="code"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        {form.errors.code &&
                                            form.touched.code && (
                                                <div className={"input-error"}>
                                                    {form.errors.code}
                                                </div>
                                            )}
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="isbn10"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            ISBN10
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                placeholder="VD: 0545010225​"
                                                value={form.values.isbn10}
                                                onChange={form.handleChange}
                                                type="text"
                                                name="isbn10"
                                                id="isbn10"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        {form.errors.isbn10 &&
                                            form.touched.isbn10 && (
                                                <div className={"input-error"}>
                                                    {form.errors.isbn10}
                                                </div>
                                            )}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="isbn13"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            ISBN13
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                placeholder="VD: 9781260013870​"
                                                value={form.values.isbn13}
                                                onChange={form.handleChange}
                                                type="text"
                                                name="isbn13"
                                                id="isbn13"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        {form.errors.isbn13 &&
                                            form.touched.isbn13 && (
                                                <div className={"input-error"}>
                                                    {form.errors.isbn13}
                                                </div>
                                            )}
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="coverPrice"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Giá bìa (đ)
                                            <span className="text-rose-500">
                                                *
                                            </span>
                                        </label>

                                        <div className="mt-1">
                                            <input
                                                placeholder="10,000​"
                                                value={form.values.coverPrice}
                                                // value={new Intl.NumberFormat("vi-VN", {
                                                //   style: "currency",
                                                //   currency: "VND",
                                                // }).format(form.values.price)}
                                                onChange={form.handleChange}
                                                type="text"
                                                name="coverPrice"
                                                id="coverPrice"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        {form.errors.coverPrice &&
                                            form.touched.coverPrice && (
                                                <div className={"input-error"}>
                                                    {form.errors.coverPrice}
                                                </div>
                                            )}
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="size"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Kích thước
                                            <span className="text-rose-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                placeholder="VD: 25cm x 25cm"
                                                value={form.values.size}
                                                onChange={form.handleChange}
                                                type="text"
                                                name="size"
                                                id="size"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        {form.errors.size &&
                                            form.touched.size && (
                                                <div className={"input-error"}>
                                                    {form.errors.size}
                                                </div>
                                            )}
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="language"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Ngôn ngữ
                                            <span className="text-rose-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                onChange={form.handleChange}
                                                value={form.values.language}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                name="language"
                                                id="language"
                                            >
                                                {languages?.map(
                                                    (language, index) => (
                                                        <option
                                                            value={language}
                                                            key={index}
                                                        >
                                                            {language}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="releasedYear"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Năm phát hành
                                            <span className="text-rose-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                value={form.values.releasedYear}
                                                onChange={form.handleChange}
                                                type="number"
                                                name="releasedYear"
                                                id="releasedYear"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        {form.errors.releasedYear &&
                                            form.touched.releasedYear && (
                                                <div className={"input-error"}>
                                                    {form.errors.releasedYear}
                                                </div>
                                            )}
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="page"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Số trang
                                            <span className="text-rose-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                value={form.values.page}
                                                onChange={form.handleChange}
                                                type="number"
                                                name="page"
                                                id="page"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        {form.errors.page &&
                                            form.touched.page && (
                                                <div className={"input-error"}>
                                                    {form.errors.page}
                                                </div>
                                            )}
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="publisher"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Nhà xuất bản
                                            <span className="text-rose-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                onChange={form.handleChange}
                                                value={form.values.publisherId}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                name="publisherId"
                                                id="publisherId"
                                            >
                                                {publishers?.data?.map(
                                                    (publisher) => (
                                                        <option
                                                            value={Number(
                                                                publisher?.id
                                                            )}
                                                            key={publisher?.id}
                                                        >
                                                            {publisher?.name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="genreId"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Thể loại
                                            <span className="text-rose-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                onChange={form.handleChange}
                                                value={form.values.genreId}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                name="genreId"
                                                id="genreId"
                                            >
                                                {genres?.map((genre) => (
                                                    <option
                                                        value={genre?.id}
                                                        key={genre?.id}
                                                    >
                                                        {genre?.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8">
                        <h3 className="text-lg font-bold leading-6 text-gray-900">
                            Tác giả và dịch giả
                        </h3>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
=======
                        </div>
                    </div>

                    <div className="pt-8">
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="isbn10"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    ISBN10
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.isbn10}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="isbn10"
                                        id="isbn10"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.isbn10 && form.touched.isbn10 && (
                                    <div className={'input-error'}>
                                        {form.errors.isbn10}
                                    </div>
                                )}
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="isbn13"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    ISBN13
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.isbn13}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="isbn13"
                                        id="isbn13"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.isbn13 && form.touched.isbn13 && (
                                    <div className={'input-error'}>
                                        {form.errors.isbn13}
                                    </div>
                                )}
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Giá sách
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.price}
                                        onChange={form.handleChange}
                                        type="number"
                                        name="price"
                                        id="price"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.price && form.touched.price && (
                                    <div className={'input-error'}>
                                        {form.errors.price}
                                    </div>
                                )}
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="size"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Kích thước
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.size}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="size"
                                        id="size"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.size && form.touched.size && (
                                    <div className={'input-error'}>
                                        {form.errors.size}
                                    </div>
                                )}
                            </div>

                            <div className="sm:col-span-3">
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                                <label
                                    htmlFor="translator"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Dịch giả
<<<<<<< HEAD
                                    {/*<span className="text-rose-500">*</span>*/}
                                </label>
                                <div className="mt-1">
                                    <input
                                        placeholder="VD: Nguyễn Văn A, Nguyễn Văn B"
=======
                                </label>
                                <div className="mt-1">
                                    <input
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                                        value={form.values.translator}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="translator"
                                        id="translator"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.translator &&
                                    form.touched.translator && (
<<<<<<< HEAD
                                        <div className={"input-error"}>
=======
                                        <div className={'input-error'}>
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                                            {form.errors.translator}
                                        </div>
                                    )}
                            </div>
<<<<<<< HEAD
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="author"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Tác giả
                                    <span className="text-rose-500">*</span>
                                </label>
                                <div>
                                    <div className="flex justify-end mb-4 gap-4">
                                        <CreateButton
                                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            onClick={() =>
                                                setShowAuthorSelectModal(true)
                                            }
                                            label="Thêm tác giả"
                                        />
                                    </div>
                                    <SelectAuthorTable
                                        selectedAuthors={form.values.authors}
                                        handleRemoveAuthor={handleRemoveAuthor}
                                    />
                                    {form.errors.authors &&
                                        form.touched.authors && (
                                            <ErrorMessage>
                                                {form.errors.authors}
                                            </ErrorMessage>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8">
                        <h3 className="text-lg font-bold leading-6 text-gray-900">
                            Định dạng
                        </h3>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="size"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Link PDF Trial
                                </label>
                                <div className="mt-1">
                                    <input
                                        placeholder="VD: https://tiki.vn/tu-sach-nghe-thuat-lanh-dao"
                                        value={form.values.pdfTrialUrl}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="pdfTrialUrl"
                                        id="pdfTrialUrl"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {/* {form.errors.size && form.touched.size && (
                  <div className={"input-error"}>{form.errors.size}</div>
                )} */}
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Giá kèm PDF
                                </label>
                                <div className="mt-1">
                                    <input
                                        placeholder="10,000​"
                                        value={form.values.pdfExtraPrice}
                                        // value={form.values.price && getFormattedPrice(form.values.price)}
                                        // value={new Intl.NumberFormat("vi-VN", {
                                        //   style: "currency",
                                        //   currency: "VND",
                                        // }).format(form.values.price)}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="pdfExtraPrice"
                                        id="pdfExtraPrice"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.pdfExtraPrice &&
                                    form.touched.pdfExtraPrice && (
                                        <div className={"input-error"}>
                                            {form.errors.pdfExtraPrice}
                                        </div>
                                    )}
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="size"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Link Audio Trial
                                </label>
                                <div className="mt-1">
                                    <input
                                        placeholder="VD: https://tiki.vn/tu-sach-nghe-thuat-lanh-dao"
                                        value={form.values.audioTrialUrl}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="audioTrialUrl"
                                        id="audioTrialUrl"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {/* {form.errors.size && form.touched.size && (
                  <div className={"input-error"}>{form.errors.size}</div>
                )} */}
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Giá kèm Audio
                                </label>
                                <div className="mt-1">
                                    <input
                                        placeholder="10,000​"
                                        value={form.values.audioExtraPrice}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="audioExtraPrice"
                                        id="audioExtraPrice"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.audioExtraPrice &&
                                    form.touched.audioExtraPrice && (
                                        <div className={"input-error"}>
                                            {form.errors.audioExtraPrice}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="pt-8">
                        <h3 className="text-lg font-bold leading-6 text-gray-900">
                            Mô tả sách
                        </h3>
                        <div className="sm:col-span-6">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Mô tả<span className="text-rose-500">*</span>
                            </label>
                            <div className="mt-1">
                                <textarea
                                    value={form.values.description}
                                    onChange={form.handleChange}
                                    id="description"
                                    name="description"
                                    rows={7}
                                    className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            {form.errors.description &&
                                form.touched.description && (
                                    <div className={"input-error"}>
                                        {form.errors.description}
                                    </div>
                                )}
=======

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="language"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Ngôn ngữ
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.language}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="language"
                                        id="language"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.language &&
                                    form.touched.language && (
                                        <div className={'input-error'}>
                                            {form.errors.language}
                                        </div>
                                    )}
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="unitInStock"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Số lượng
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.unitInStock}
                                        onChange={form.handleChange}
                                        type="number"
                                        name="unitInStock"
                                        id="unitInStock"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.unitInStock &&
                                    form.touched.unitInStock && (
                                        <div className={'input-error'}>
                                            {form.errors.unitInStock}
                                        </div>
                                    )}
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="releasedYear"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Năm xuất bản
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.releasedYear}
                                        onChange={form.handleChange}
                                        type="number"
                                        name="releasedYear"
                                        id="releasedYear"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.releasedYear &&
                                    form.touched.releasedYear && (
                                        <div className={'input-error'}>
                                            {form.errors.releasedYear}
                                        </div>
                                    )}
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="page"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Số trang
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.page}
                                        onChange={form.handleChange}
                                        type="number"
                                        name="page"
                                        id="page"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.page && form.touched.page && (
                                    <div className={'input-error'}>
                                        {form.errors.page}
                                    </div>
                                )}
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="publisher"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Nhà xuất bản
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={(e) =>
                                            setSelectedPublisherId(
                                                e.target.value
                                            )
                                        }
                                        value={selectedPublisherId!}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        name="publisher"
                                        id="publisher"
                                    >
                                        {publishers?.data?.map((publisher) => (
                                            <option
                                                value={publisher?.id}
                                                key={publisher?.id}
                                            >
                                                {publisher?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="author"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Tác giả
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={(e) =>
                                            setSelectedAuthorId(e.target.value)
                                        }
                                        value={selectedAuthorId!}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        name="author"
                                        id="author"
                                    >
                                        {authors?.data?.map((author) => (
                                            <option
                                                value={author?.id}
                                                key={author?.id}
                                            >
                                                {author?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Thể loại
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={(e) =>
                                            setSelectedCategoryId(
                                                e.target.value
                                            )
                                        }
                                        value={selectedCategoryId!}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        name="category"
                                        id="category"
                                    >
                                        {categories?.data?.map((category) => (
                                            <option
                                                value={category?.id}
                                                key={category?.id}
                                            >
                                                {category?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                        </div>
                    </div>
                </div>

                <div className="pt-5">
<<<<<<< HEAD
                    {/* <div className="flex justify-end"> */}
                    <button
                        type="submit"
                        className="bg-slate-200 hover:bg-slate-300 text-gray-800 text-sm font-medium py-2 px-4 rounded inline-flex gap-2 items-center mt-5"
                    >
                        Tạo sách
                    </button>
                    {/* </div> */}
                </div>
            </form>
            <AuthorModal
                action={AuthorModalMode.CREATE}
                onClose={() => setShowCreateModal(false)}
                isOpen={showCreateModal}
                author={selectedAuthor as IAuthor}
            />

            {/* <AuthorModal
                action={AuthorModalMode.UPDATE}
                author={selectedAuthor as { id?: number; name?: string }}
                onClose={() => setShowUpdateModal(false)}
                isOpen={showUpdateModal}
            /> */}
            <SelectAuthorModal
                isOpen={showauthorselectModal}
                onClose={() => setShowAuthorSelectModal(false)}
                onItemSelect={(author) => {
                    console.log(author);

                    handleAddAuthor(author);
                    setShowAuthorSelectModal(false);
                }}
                selectedAuthors={form.values.authors}
            />
        </Fragment>
    );
};
IssuerCreateBookPage.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};
=======
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Tạo sách
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
};

>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
export default IssuerCreateBookPage;

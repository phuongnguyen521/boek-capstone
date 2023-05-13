<<<<<<< HEAD
import React, { FormEvent, useEffect, useState } from "react";
=======
import React from 'react';
import { useRouter } from 'next/router';
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb

type Props = {
    placeholder?: string;
    value?: string;
<<<<<<< HEAD
    onSearchSubmit?: (value: string) => void;
};

const SearchForm: React.FC<Props> = ({
                                         value,
                                         placeholder = "Tìm kiếm...",
                                         onSearchSubmit,
                                     }) => {

    const [inputSearch, setInputSearch] = useState(value || "");

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSearchSubmit) {
            onSearchSubmit(inputSearch);
        }
    };

    useEffect(() => {
        setInputSearch(value || "");
    }, [value]);


    console.log("inputSearch", inputSearch);
    console.log("value", value);
    return (
        <form onSubmit={onSubmit} className="relative">
=======
};

const SearchForm: React.FC<Props> = ({
    value,
    placeholder = 'Tìm kiếm...',
}) => {
    const router = useRouter();
    const [searchValue, setSearchValue] = React.useState(value);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push({
            pathname: router.pathname,
            query: {
                search: searchValue,
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="relative">
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
            <label htmlFor="action-search" className="sr-only">
                Search
            </label>
            <input
<<<<<<< HEAD
                onChange={(e) => setInputSearch(e.target.value)}
                value={inputSearch}
                name="search"
                className="form-input rounded border border-slate-200 bg-white py-2 px-3 pl-9 text-sm leading-5 text-slate-800 placeholder-slate-400 shadow-sm hover:border-slate-300 focus:border-blue-500 focus:ring-1"
=======
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                id="action-search"
                name="search"
                className="form-input rounded border border-slate-200 bg-white py-2 px-3 pl-9 text-sm leading-5 text-slate-800 placeholder-slate-400 shadow-sm hover:border-slate-300 focus:border-slate-500 focus:border-slate-300 focus:ring-0"
                type="search"
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                placeholder={placeholder}
            />
            <button
                className="group absolute inset-0 right-auto"
                type="submit"
                aria-label="Search"
            >
                <svg
                    className="ml-3 mr-2 h-4 w-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                >
<<<<<<< HEAD
                    <path
                        d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                    <path
                        d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
=======
                    <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                    <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                </svg>
            </button>
        </form>
    );
};

export default SearchForm;

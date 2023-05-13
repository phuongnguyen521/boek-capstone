<<<<<<< HEAD
import React, { useState } from "react";
import { IBookResponse } from "../../old-types/response/IBookResponse";
import Image from "next/image";
import DefaultAvatar from "./../../assets/images/default-avatar.png";
import TableData, { noDataLabel } from "./TableData";
import { getFormattedPrice } from "../../utils/helper";
import BookModal, { BookModalMode } from "./../../components/Modal/BookModal";
=======
import React from 'react';
import { IBookResponse } from '../../types/response/IBookResponse';
import Image from 'next/image';
import DefaultAvatar from '../../assets/images/default_avatar.png';
import TableData, { noDataLabel } from './TableData';
import { getFormattedPrice } from '../../utils/helper';
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb

type Props = {
    book: IBookResponse;
};
<<<<<<< HEAD
const BookRow: React.FC<Props> = ({ book }) => {
    const [selectedBook, setSelectedBook] = useState<{
        id?: number;
        name?: string;
    }>();
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
=======

const BookRow: React.FC<Props> = ({ book }) => {
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
    return (
        <tr>
            <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                <div className="text-left">{book?.code}</div>
            </td>
            <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                <div className="flex items-center">
                    <div className="mr-2 h-[100px] w-[64px] shrink-0 sm:mr-3">
<<<<<<< HEAD
                        {/* Khi bấm vào tên sách sẽ hiện Modal bao gồm tên chi tiết của sách và hình sách */}
                        <Image
                            onClick={() => {
                                setSelectedBook({
                                    id: book?.id,
                                    name: book?.name,
                                });
                                setShowUpdateModal(true);
                            }}
                            className="cursor-pointer rounded"
                            src={book?.imageUrl || DefaultAvatar.src}
                            width="80"
                            height="100"
                            alt={book?.name || ""}
                        />
                    </div>
                    <div className="w-[100px] overflow-hidden text-ellipsis font-medium text-slate-500">
=======
                        <Image
                            className="rounded"
                            src={book?.imageUrl || DefaultAvatar.src}
                            width="80"
                            height="100"
                            alt={book?.name || ''}
                        />
                    </div>
                    <div className="font-medium text-slate-800">
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                        {book.name}
                    </div>
                </div>
            </td>

<<<<<<< HEAD
            <TableData>{book?.price && getFormattedPrice(book?.price)}</TableData>
            <TableData alignClass={"text-center"}>
                {book?.publisher?.name || noDataLabel}
            </TableData>
            <TableData alignClass={"text-center"}>
                {book?.releasedYear || noDataLabel}
            </TableData>
            <TableData alignClass={"text-center"}>
=======
            <TableData>
                {book?.price && getFormattedPrice(book?.price)}
            </TableData>
            <TableData alignClass={'text-center'}>
                {book?.publisher?.name || noDataLabel}
            </TableData>
            <TableData alignClass={'text-center'}>
                {book?.releasedYear || noDataLabel}
            </TableData>
            <TableData alignClass={'text-center'}>
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                {book?.page || noDataLabel}
            </TableData>
            <TableData>{book?.isbn10 || noDataLabel}</TableData>
            <TableData>{book?.isbn13 || noDataLabel}</TableData>
            <TableData>{book?.size || noDataLabel}</TableData>
            <TableData>
<<<<<<< HEAD
                {book?.authorBooks?.map((a) => a.author?.name).join(", ") ||
=======
                {book?.authorBooks?.map((a) => a.author?.name).join(', ') ||
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                    noDataLabel}
            </TableData>
            <TableData>{book?.category?.name || noDataLabel}</TableData>
            <TableData>{book?.language || noDataLabel}</TableData>
            <td className="w-px whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                {/* Menu button */}
<<<<<<< HEAD
                {/* <button className="rounded-full text-slate-400 hover:text-slate-500">
          <span className="sr-only">Menu</span>
          <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="2" />
            <circle cx="10" cy="16" r="2" />
            <circle cx="22" cy="16" r="2" />
          </svg>
        </button> */}
            </td>
            <BookModal
                action={BookModalMode.UPDATE}
                book={selectedBook as { id?: number; name?: string }}
                onClose={() => setShowUpdateModal(false)}
                isOpen={showUpdateModal}
            />
=======
                <button className="rounded-full text-slate-400 hover:text-slate-500">
                    <span className="sr-only">Menu</span>
                    <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2" />
                        <circle cx="10" cy="16" r="2" />
                        <circle cx="22" cy="16" r="2" />
                    </svg>
                </button>
            </td>
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
        </tr>
    );
};

export default BookRow;

import React from "react";
import TableHeading from "../Admin/Table/TableHeading";
import TableHeader from "../Admin/Table/TableHeader";
import TableBody from "../Admin/Table/TableBody";
import TableData from "../Admin/Table/TableData";
import Image from "next/image";
import { getAvatarFromName } from "../../utils/helper";
import TableWrapper from "../Admin/Table/TableWrapper";
import { IAuthor } from "./../../types/Author/IAuthor";

type Props = {
    selectedAuthors: IAuthor[];
    handleRemoveAuthor: (organization: IAuthor) => void;
};

const SelectGroupsTable: React.FC<Props> = ({
                                                selectedAuthors,
                                                handleRemoveAuthor,
                                            }) => {
    return (
        <TableWrapper>
            <TableHeading>
                <TableHeader>Tên tác giả</TableHeader>
                {/*<TableHeader>Mô tả</TableHeader>*/}
                <TableHeader>
                    <span className="sr-only">Actions</span>
                </TableHeader>
            </TableHeading>
            <TableBody>
                {selectedAuthors && selectedAuthors?.length > 0 ? (
                    selectedAuthors?.map((author, index) => {
                        return (
                            <tr key={author?.id}>
                                <TableData>
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <Image
                                                width={100}
                                                height={100}
                                                className="h-10 w-10 rounded-full object-cover"
                                                src={author?.imageUrl || getAvatarFromName(author?.name)}
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {author?.name}
                                            </div>
                                        </div>
                                    </div>
                                </TableData>
                                {/*<TableData>*/}
                                {/*    <div className="text-sm text-gray-900">*/}
                                {/*        {author?.description}*/}
                                {/*    </div>*/}
                                {/*</TableData>*/}

                                <TableData className="text-right text-sm font-medium">
                                    <button
                                        onClick={() => {
                                            handleRemoveAuthor(author);
                                        }}
                                        className="text-rose-600 hover:text-rose-800"
                                    >
                                        Xoá
                                    </button>
                                </TableData>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <TableData
                            colSpan={3}
                            textAlignment={"text-center"}
                            className="text-sm font-medium uppercase leading-10 text-gray-500 "
                        >
                            Chưa có tác giả nào được chọn
                        </TableData>
                    </tr>
                )}
            </TableBody>
        </TableWrapper>
    );
};

export default SelectGroupsTable;

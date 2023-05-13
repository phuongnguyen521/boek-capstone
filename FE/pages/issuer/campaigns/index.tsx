<<<<<<< HEAD
import React, { ReactElement } from "react";
import AdminLayout from "../../../components/Layout/AdminLayout";
import { NextPageWithLayout } from "../../_app";
import CampaignListPage from "../../../components/CampaignListPage";

const IssuerCampaignsPage: NextPageWithLayout = () => {
    return <CampaignListPage />;
    // const {search, setSearch} = useSearchQuery("search", () => setPage(1));
    //
    // const [size, setSize] = useState<number>(6);
    // const [page, setPage] = useState<number>(1);
    // const [selectedFormat, setSelectedFormat] = useState<undefined | number>(1);
    // const [selectedStatus, setSelectedStatus] = useState<undefined | number>(
    //     undefined
    // );
    // const [selectedOption, setSelectedOption] = useState<typeof CampaignSelectOptions[number]>(
    //     CampaignSelectOptions[0]
    // );
    // const {loginUser} = useAuth();
    // const campaignService = new CampaignService(loginUser?.accessToken);
    // const commonParams = {
    //     name: search,
    //     page,
    //     size,
    //     status: selectedStatus,
    //     format: selectedFormat,
    //     sort: "createdDate desc",
    //     withAddressDetail: true,
    // }
    // const {
    //     data: campaignsData,
    //     isLoading,
    //     isFetching,
    // } = useQuery(
    //     [
    //         "issuer_campaigns",
    //         {
    //             search, page, size, selectedFormat, selectedStatus,
    //             selectedOption
    //         },
    //     ],
    //     selectedOption.id === 1 ?
    //         () => campaignService.getCampaignsByIssuer(commonParams)
    //         : () => campaignService.getOtherCampaignsByIssuer(commonParams),
    //     {
    //         keepPreviousData: true,
    //     }
    // );
    //
    // const handleFormatChange = useCallback(
    //     (formatId?: number) => {
    //         setSelectedFormat(formatId);
    //         setPage(1);
    //     },
    //     [setSelectedFormat, setPage]
    // );
    //
    // const handleStatusChange = useCallback(
    //     (statusId?: number) => {
    //         setSelectedStatus(statusId);
    //         setPage(1);
    //     },
    //     [setSelectedStatus, setPage]
    // );
    // if (isLoading)
    //     return <LoadingSpinnerWithOverlay label="Đang tải các hội sách"/>;
    //
    // return (
    //     <Fragment>
    //         {isFetching && <LoadingTopPage/>}
    //         <PageHeading label="Hội sách">
    //             <SearchForm
    //                 placeholder="Tìm kiếm hội sách"
    //                 value={search}
    //                 onSearchSubmit={(value) => setSearch(value)}
    //             />
    //         </PageHeading>
    //
    //         <div className="bg-white px-4 md:px-6 rounded">
    //             <div>
    //                 <Tab.Group>
    //                     <div className="flex justify-between items-center border-b pt-2 border-gray-200">
    //                         <ul className="flex flex-wrap gap-2">
    //                             {CampaignFormatTabs.map((tab) => (
    //                                 <Tab
    //                                     onClick={() => handleFormatChange(tab.id)}
    //                                     as={"div"}
    //                                     className={"focus:outline-none"}
    //                                     key={tab.name}
    //                                 >
    //                                     <div
    //                                         className="cursor-pointer ui-selected:border-indigo-500 ui-selected:text-indigo-600 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm">
    //                                         {tab.name}
    //                                     </div>
    //                                 </Tab>
    //                             ))}
    //                         </ul>
    //
    //                         <div className={'w-56'}>
    //                             <SelectBox<typeof CampaignSelectOptions[number]>
    //                                 searchable={false}
    //                                 placeholder={''}
    //                                 value={selectedOption}
    //                                 dataSource={CampaignSelectOptions}
    //                                 onValueChange={(o) => {
    //                                     setPage(1);
    //                                     setSelectedOption(o);
    //                                 }}
    //                                 displayKey={'name'}/>
    //                         </div>
    //                     </div>
    //                 </Tab.Group>
    //
    //             </div>
    //
    //             <Tab.Group>
    //                 <div className="py-6">
    //                     <ul className="flex flex-wrap gap-2">
    //                         {CampaignStatusTabs.map((tab) => (
    //                             <Tab
    //                                 onClick={() => handleStatusChange(tab.id)}
    //                                 as={"div"}
    //                                 className={"focus:outline-none"}
    //                                 key={tab.displayName}
    //                             >
    //                                 {({selected}) => {
    //                                     return (
    //                                         <Chip active={selected}>
    //                                             {tab?.statusColor && (
    //                                                 <span
    //                                                     className={`mr-2 inline-block h-2 w-2 rounded-full bg-${tab.statusColor}-500`}
    //                                                 />
    //                                             )}
    //                                             {tab.displayName}
    //                                         </Chip>
    //                                     );
    //                                 }}
    //                             </Tab>
    //                         ))}
    //                     </ul>
    //                 </div>
    //             </Tab.Group>
    //             {campaignsData?.data && campaignsData?.data?.length > 0 ? (
    //                 <div className="pb-6">
    //                     <div className="grid gap-6 md:grid-cols-2 mb-4">
    //                         {campaignsData?.data?.map((campaign) => (
    //                             <CampaignCard
    //                                 key={campaign?.id}
    //                                 campaign={campaign}
    //                             />
    //                         ))}
    //                     </div>
    //                     <div className="flex justify-end items-center">
    //                         {/* <span className="text-sm text-gray-500">
    //                             Hiển thị từ{" "}
    //                             <span className="font-medium">{fromItem}</span>{" "}
    //                             đến{" "}
    //                             <span className="font-medium">{toItem}</span>{" "}
    //                             trong tổng số{" "}
    //                             <span className="font-medium">
    //                                 {campaignsData?.metadata?.total}
    //                             </span>{" "}
    //                             kết quả
    //                         </span> */}
    //                         <Pagination
    //                             currentPage={page}
    //                             pageSize={size}
    //                             totalItems={campaignsData?.metadata?.total || 0}
    //                             onPageChange={(page) => setPage(page)}
    //                             visiblePageButtonLimit={3}
    //                         />
    //                     </div>
    //                 </div>
    //             ) : (
    //                 <div className="py-24">
    //                     {search ? (
    //                         <EmptyState
    //                             keyword={search}
    //                             searchNotFoundMessage="Hãy thử tìm kiếm với từ khóa hoặc bộ lọc khác"
    //                             status={EMPTY_STATE_TYPE.SEARCH_NOT_FOUND}
    //                         />
    //                     ) : (
    //                         <EmptyState status={EMPTY_STATE_TYPE.NO_DATA}/>
    //                     )}
    //                 </div>
    //             )}
    //         </div>
    //
    //     </Fragment>
    // )
};
IssuerCampaignsPage.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};
=======
import React, { Fragment, useState } from 'react';
import { NextPage } from 'next';
import AdminLayout from '../../../components/Layouts/AdminLayout';
import { useAuth } from '../../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { IssuerCampaignService } from '../../../services/Issuer/Issuer_CampaignService';
import SearchForm from '../../../components/Admin/SearchForm';
import AdminCampaignCard from '../../../components/Admin/AdminCampaignCard';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';
import Chip from '../../../components/Admin/Chip';

const IssuerCampaignsPage: NextPage = () => {
    const { loginUser } = useAuth();
    const issuerCampaignService = new IssuerCampaignService(
        loginUser?.accessToken
    );
    const router = useRouter();

    const [page, setPage] = React.useState(1);
    const [otherPage, setOtherPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(200);
    const [selectedStatus, setSelectedStatus] = useState<undefined | number>(
        undefined
    );

    const CampaignTabs = [
        {
            id: 0,
            name: 'Sự kiện của tôi',
        },
        {
            id: 1,
            name: 'Các sự kiện khác',
        },
    ];

    const { data: campaigns, isLoading } = useQuery(
        ['issuer_campaigns', page],
        () =>
            issuerCampaignService.getCampaigns$Issuer({
                page: page,
                size: pageSize,
                sort: 'id desc',
            })
    );

    const { data: otherCampaigns, isLoading: isOtherLoading } = useQuery(
        ['issuer_other_campaigns', otherPage],
        () =>
            issuerCampaignService.getOtherCampaigns$Issuer({
                page: otherPage,
                size: pageSize,
                sort: 'id desc',
            })
    );
    return (
        <AdminLayout>
            <div className="mb-8 sm:flex sm:items-center sm:justify-between">
                {/* Left: Title */}
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
                        Sự kiện ✨
                    </h1>
                </div>

                {/* Right: Actions */}
                <div className="grid grid-flow-col justify-start gap-2 sm:auto-cols-max sm:justify-end">
                    {/* Search form */}
                    <SearchForm />
                    {/*/!* Filter button *!/*/}
                    {/*<FilterButton align="right" />*/}
                    {/* Create campaign button */}
                </div>
            </div>

            <Tab.Group>
                <div className="mb-5">
                    <ul className="flex flex-wrap gap-2">
                        {CampaignTabs.map((tab) => (
                            <Tab
                                as={'div'}
                                className={'focus:outline-none'}
                                key={tab.name}
                            >
                                {({ selected }) => {
                                    if (selected) setSelectedStatus(tab.id);
                                    return (
                                        <Chip active={selected}>
                                            {tab.name}
                                        </Chip>
                                    );
                                }}
                            </Tab>
                        ))}
                    </ul>
                </div>

                <Tab.Panel as={Fragment}>
                    <div className="grid grid-cols-12 gap-6">
                        {isLoading ? (
                            <div>Đang tải...</div>
                        ) : (
                            campaigns?.data?.map((campaign) => (
                                <div
                                    key={campaign.id}
                                    className={
                                        'col-span-full sm:col-span-6 xl:col-span-4'
                                    }
                                >
                                    <AdminCampaignCard campaign={campaign} />
                                </div>
                            ))
                        )}
                    </div>
                </Tab.Panel>
                <Tab.Panel as={Fragment}>
                    <div className="grid grid-cols-12 gap-6">
                        {isOtherLoading ? (
                            <div>Đang tải...</div>
                        ) : (
                            otherCampaigns?.data?.map((campaign) => (
                                <div
                                    key={campaign.id}
                                    className={
                                        'col-span-full sm:col-span-6 xl:col-span-4'
                                    }
                                >
                                    <AdminCampaignCard campaign={campaign} />
                                </div>
                            ))
                        )}
                    </div>
                </Tab.Panel>
            </Tab.Group>
        </AdminLayout>
    );
};

>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
export default IssuerCampaignsPage;

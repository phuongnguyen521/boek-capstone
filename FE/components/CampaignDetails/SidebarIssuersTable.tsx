<<<<<<< HEAD
import Image from "next/image";
import React, { useContext, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { CampaignStatuses } from "../../constants/CampaignStatuses";
import { ParticipantStatuses } from "../../constants/ParticipantStatuses";
import { Roles } from "../../constants/Roles";
import { useAuth } from "../../context/AuthContext";
import { CampaignContext, CustomerCampaignContext } from "../../context/CampaignContext";
import InviteIssuerModal from "../Modal/InviteIssuerModal";
import DefaultAvatar from "./../../assets/images/default-avatar.png";
import SidebarBlockWrapper from "./SidebarBlockWrapper";
import * as HoverCard from "@radix-ui/react-hover-card";
import IssuerHoverCard from "../IssuerHoverCard";
import SidebarButton from "./SidebarButton";
import { SidebarTable } from "./SidebarTable";
import JoinedIssuerModal from "../Modal/JoinedIssuerModal";

type Props = {
    maxRows?: number;
};

const SidebarIssuersTable: React.FC<Props> = ({ maxRows = 10 }) => {
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [showAllModal, setShowAllModal] = useState(false);
    const { loginUser } = useAuth();

    const campaign = useContext(CampaignContext);
    const customerCampaign = useContext(CustomerCampaignContext);

    const isAdmin = loginUser?.role === Roles.SYSTEM.id;
    const isIssuer = loginUser?.role === Roles.ISSUER.id;
    const isCustomer = loginUser?.role === Roles.CUSTOMER.id;
    const joinedIssuers =
        (isAdmin || isIssuer) ?
            (campaign?.participants
                ?.filter(
                    (p) =>
                        p?.status === ParticipantStatuses.RequestApproved.id ||
                        p?.status === ParticipantStatuses.InvitationAccepted.id,
                )
                ?.map((p) => p?.issuer?.user) || [])
            : (customerCampaign?.issuers?.map(i => i?.user) || []);

    const showInviteIssuer =
        isAdmin && campaign?.status === CampaignStatuses.NOT_STARTED.id;

    return (
        <SidebarBlockWrapper>

            <SidebarTable.Heading
                text={`Nhà phát hành tham gia (${joinedIssuers?.length})`}
                showAllButtonVisible={joinedIssuers?.length > 0 && joinedIssuers?.length > maxRows}
                onShowAllClick={() => setShowAllModal(true)}>
                <JoinedIssuerModal
                    isOpen={showAllModal}
                    onClose={() => setShowAllModal(false)}
                    joinedIssuers={joinedIssuers}
                />
            </SidebarTable.Heading>
            {joinedIssuers?.length === 0 ? (
                <SidebarTable.Content text={"Hội sách này hiện chưa có nhà phát hành nào tham gia."} />
            ) : (
                <ul className="space-y-3.5">
                    {joinedIssuers?.slice(0, maxRows).map((issuer) => (
                        <li key={issuer?.id}>
                            <div className="flex justify-between">
                                <HoverCard.Root>
                                    <HoverCard.Trigger asChild>
                                        <div className="flex grow items-center">
                                            <div className="relative mr-3">
                                                <Image
                                                    className="h-8 w-8 rounded-full"
                                                    src={
                                                        issuer?.imageUrl ||
                                                        DefaultAvatar.src
                                                    }
                                                    width={500}
                                                    height={500}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="truncate">
                                        <span className="text-sm font-medium text-slate-800">
                                            {issuer?.name}
                                        </span>
                                            </div>
                                        </div>
                                    </HoverCard.Trigger>
                                    <HoverCard.Portal>
                                        <HoverCard.Content
                                            className={"radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down rounded-lg p-4 pt-0 md:w-full animate-fade-in"}
                                            align="start"
                                            sideOffset={4}>
                                            <HoverCard.Arrow className="fill-current text-gray-50" />
                                            <IssuerHoverCard issuer={issuer} />
                                        </HoverCard.Content>
                                    </HoverCard.Portal>
                                </HoverCard.Root>

                                {isAdmin && <button className="rounded-full text-slate-400 hover:text-slate-500">
=======
import React from 'react';
import { IUser } from '../../types/user/IUser';
import SidebarBlockWrapper from './SidebarBlockWrapper';
import Image from 'next/image';
import DefaultAvatar from '../../assets/images/default_avatar.png';

type Props = {
    issuers: IUser[];
    maxRows?: number;
};

const SidebarIssuersTable: React.FC<Props> = ({ issuers, maxRows = 10 }) => {
    return (
        <SidebarBlockWrapper>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-1">
                <div className="text-base font-semibold text-slate-800">
                    Nhà phát hành tham gia ({issuers?.length})
                </div>
                {issuers?.length > 0 && issuers?.length > maxRows && (
                    <button className="text-base font-medium text-indigo-500 hover:text-indigo-600 disabled:text-gray-500">
                        Xem tất cả
                    </button>
                )}
            </div>
            {issuers?.length === 0 ? (
                <div className="text-sm text-slate-500">
                    Sự kiện này hiện chưa có nhà phát hành nào tham gia.
                </div>
            ) : (
                <ul className="space-y-3.5">
                    {issuers?.slice(0, maxRows).map((issuer) => (
                        <li key={issuer.id}>
                            <div className="flex justify-between">
                                <div className="flex grow items-center">
                                    <div className="relative mr-3">
                                        <Image
                                            className="h-8 w-8 rounded-full"
                                            src={
                                                issuer?.imageUrl ||
                                                DefaultAvatar.src
                                            }
                                            width="32"
                                            height="32"
                                            alt="User 08"
                                        />
                                    </div>
                                    <div className="truncate">
                                        <span className="text-sm font-medium text-slate-800">
                                            {issuer?.name}
                                        </span>
                                    </div>
                                </div>
                                <button className="rounded-full text-slate-400 hover:text-slate-500">
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                                    <span className="sr-only">Menu</span>
                                    <svg
                                        className="h-8 w-8 fill-current"
                                        viewBox="0 0 32 32"
                                    >
                                        <circle cx="16" cy="16" r="2" />
                                        <circle cx="10" cy="16" r="2" />
                                        <circle cx="22" cy="16" r="2" />
                                    </svg>
<<<<<<< HEAD
                                </button>}
=======
                                </button>
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                            </div>
                        </li>
                    ))}
                </ul>
            )}
<<<<<<< HEAD
            {isAdmin && (
                <div className="space-y-2.5 mt-5">
                    {showInviteIssuer && (
                        <SidebarButton
                            onClick={() => setShowInviteModal(true)}
                        >
                            <AiOutlineUsergroupAdd
                                className="mr-2.5"
                                size={17}
                            />
                            Mời NPH tham gia
                        </SidebarButton>
                    )}
                    <SidebarButton
                        variant="secondary"
                        href={`/admin/participants?campaign=${campaign?.id}`}
                        className="m-btn bg-white !border-slate-200 !shadow text-slate-600 w-full border bg-slate-50"
                    >
                        Quản lý yêu cầu tham gia
                    </SidebarButton>
                </div>
            )}

            {showInviteIssuer && (
                <InviteIssuerModal
                    isOpen={showInviteModal}
                    onClose={() => setShowInviteModal(false)}
                />
            )}
=======
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
        </SidebarBlockWrapper>
    );
};

export default SidebarIssuersTable;

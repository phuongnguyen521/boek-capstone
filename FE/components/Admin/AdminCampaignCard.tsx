<<<<<<< HEAD
import React from "react";
import { ICampaign } from "../../old-types/campaign/ICampaign";
import AvatarGroup from "../Commons/AvatarGroup/AvatarGroup";
import DefaultAvatar from "./../../assets/images/default-avatar.png";
import { IUser } from "../../old-types/user/IUser";
import StatusLabel from "../CampaignDetails/StatusLabel";
import { getFormattedDate } from "../../utils/helper";
import { IoBusiness, IoCheckmark, IoCodeWorking, IoLocation, IoPerson, IoPersonAdd, IoRemove } from "react-icons/io5";
import { CampaignStatuses, ParticipationStatuses } from "../../constants/Statuses";
import { useAuth } from "../../context/AuthContext";
import { findRole } from "../../constants/Roles";
import { IParticipation } from "../../old-types/participation/IParticipation";
import Link from "next/link";
import { useRouter } from "next/router";
import { IOrganizationCampaign } from "../../old-types/joins/IOrganizationCampaign";


const FeaturedItem: React.FC<{ children: React.ReactNode }> = ({
                                                                   children,
                                                               }) => {
=======
import React from 'react';
import { ICampaign } from '../../types/campaign/ICampaign';
import AvatarGroup from '../Commons/AvatarGroup/AvatarGroup';
import DefaultAvatar from '../../assets/images/default_avatar.png';
import { IUser } from '../../types/user/IUser';
import StatusLabel from '../CampaignDetails/StatusLabel';
import { getFormattedDate } from '../../utils/helper';
import {
    IoBusiness,
    IoCheckmark,
    IoCodeWorking,
    IoLocation,
    IoPerson,
    IoPersonAdd,
    IoRemove,
} from 'react-icons/io5';
import {
    CampaignStatuses,
    ParticipationStatuses,
} from '../../constants/Statuses';
import { useAuth } from '../../context/AuthContext';
import { Roles } from '../../constants/Roles';
import { IParticipation } from '../../types/participation/IParticipation';
import Link from 'next/link';
import { useRouter } from 'next/router';

const FeaturedItem: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
    return (
        <li className="flex items-center gap-2 font-medium text-slate-600">
            {children}
        </li>
    );
};

const IssuerActions: React.FC<{
    campaign: ICampaign;
    participationOfIssuer: IParticipation | undefined;
}> = ({ campaign, participationOfIssuer }) => {
    const participationStatus = participationOfIssuer?.status;
    const campaignStatus = campaign?.status;

<<<<<<< HEAD
    console.log("participationStatus", participationStatus);

    const infoButtonClasses =
        "flex items-center gap-1.5 text-slate-600 font-medium text-base px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200";

    return (
        <div className="mt-3 flex items-center justify-end gap-4">
            {(participationStatus === ParticipationStatuses.ISSUER_ACCEPTED.id ||
                    participationStatus === ParticipationStatuses.ISSUER_REJECTED.id) &&
=======
    console.log('participationStatus', participationStatus);

    const infoButtonClasses =
        'flex items-center gap-1.5 text-slate-600 font-medium text-base px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200';

    return (
        <div className="mt-3 flex items-center justify-end gap-4">
            {(participationStatus ===
                ParticipationStatuses.ISSUER_ACCEPTED.id ||
                participationStatus ===
                    ParticipationStatuses.ISSUER_REJECTED.id) &&
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                campaignStatus === CampaignStatuses.STARTING.id && (
                    <button className={infoButtonClasses}>
                        <IoCheckmark />
                        <span>Đang tham gia</span>
                    </button>
                )}
<<<<<<< HEAD
            {(participationStatus === ParticipationStatuses.ISSUER_ACCEPTED.id ||
                    participationStatus === ParticipationStatuses.ISSUER_REJECTED.id) &&
=======
            {(participationStatus ===
                ParticipationStatuses.ISSUER_ACCEPTED.id ||
                participationStatus ===
                    ParticipationStatuses.ISSUER_REJECTED.id) &&
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                campaignStatus === CampaignStatuses.FINISHED.id && (
                    <button className={infoButtonClasses}>
                        <IoCheckmark />
                        <span>Đã tham gia</span>
                    </button>
                )}

<<<<<<< HEAD
            {participationStatus === ParticipationStatuses.WAITING_APPROVAL.id &&
=======
            {participationStatus ===
                ParticipationStatuses.WAITING_APPROVAL.id &&
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                campaignStatus === CampaignStatuses.NOT_STARTED.id && (
                    <button className={infoButtonClasses}>
                        <IoCodeWorking />
                        <span>Đang đợi duyệt</span>
                    </button>
                )}
<<<<<<< HEAD
            {participationStatus === ParticipationStatuses.WAITING_ISSUER_ACCEPT.id &&
=======
            {participationStatus ===
                ParticipationStatuses.WAITING_ISSUER_ACCEPT.id &&
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                campaignStatus === CampaignStatuses.NOT_STARTED.id && (
                    <>
                        <button
                            className={
<<<<<<< HEAD
                                "m-btn-lg gap-1.5 bg-indigo-500 text-base uppercase text-white hover:bg-indigo-600"
=======
                                'm-btn-lg gap-1.5 bg-indigo-500 text-base uppercase text-white hover:bg-indigo-600'
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                            }
                        >
                            <IoCheckmark />
                            <span>Đồng ý</span>
                        </button>
                        <button
                            className={
<<<<<<< HEAD
                                "m-btn-lg gap-1.5 bg-slate-500 text-base uppercase text-white hover:bg-slate-600"
=======
                                'm-btn-lg gap-1.5 bg-slate-500 text-base uppercase text-white hover:bg-slate-600'
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                            }
                        >
                            <IoRemove />
                            <span>Từ chối</span>
                        </button>
                    </>
                )}
            {!participationStatus &&
                campaignStatus === CampaignStatuses.NOT_STARTED.id && (
                    <button
                        className={
<<<<<<< HEAD
                            "m-btn-lg gap-1.5 bg-indigo-500 text-base uppercase text-white hover:bg-indigo-600"
=======
                            'm-btn-lg gap-1.5 bg-indigo-500 text-base uppercase text-white hover:bg-indigo-600'
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                        }
                    >
                        <IoPersonAdd />
                        <span>Yêu cầu tham gia</span>
                    </button>
                )}
        </div>
    );
};

const SystemActions: React.FC<{ campaign: ICampaign }> = ({ campaign }) => {
    return (
        <div className="flex items-center justify-end gap-4">
            {/*<button className="text-white bg-red-500 rounded py-2 px-4 hover:bg-red-600 transition duration-300 ease-in-out font-medium">*/}
            {/*    Xóa*/}
            {/*</button>*/}
        </div>
    );
};

type Props = {
    campaign: ICampaign;
<<<<<<< HEAD
    organization: IOrganizationCampaign;
};
const AdminCampaignCard: React.FC<Props> = ({ campaign, organization }) => {
=======
};
const AdminCampaignCard: React.FC<Props> = ({ campaign }) => {
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
    const { loginUser } = useAuth();
    const router = useRouter();
    const issuers = campaign.participations
        ?.filter((p) => p.issuer)
        .map((p) => p.issuer) as IUser[];
<<<<<<< HEAD
    // const participationOfIssuer =
    //   loginUser?.role === Roles.ISSUER.id
    //     ? campaign.participations?.find((p) => p.issuerId === loginUser?.userId)
    //     : undefined;
    return (
        //make the card float pointer when hover
        <div
            className="flex h-full cursor-pointer  flex-col  rounded border bg-white p-5 shadow-sm transition duration-500 ease-in-out hover:shadow-md">
=======
    const participationOfIssuer =
        loginUser?.role === Roles.ISSUER.id
            ? campaign.participations?.find(
                  (p) => p.issuerId === loginUser?.userId
              )
            : undefined;
    return (
        <div className="flex h-full flex-col  rounded border bg-white p-5 shadow-sm">
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
            {/*Header*/}
            <header className="flex items-center justify-between">
                <StatusLabel statusId={campaign?.status} />
                {issuers && issuers.length > 0 && (
                    <div className="scale-105">
                        <AvatarGroup
                            max={3}
                            avatars={issuers.map((i) => {
                                return {
                                    src: i.imageUrl || DefaultAvatar.src,
                                    title: i?.name,
                                };
                            })}
                        />
                    </div>
                )}
            </header>
            <div className="mt-3.5 grow">
                <Link
<<<<<<< HEAD
                    href={
                        findRole(loginUser?.role)?.baseUrl +
                        `/campaigns/${campaign?.id}`
                    }
=======
                    href={{
                        pathname: `${router.pathname}/[campaignId]`,
                        query: { campaignId: campaign.id },
                    }}
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                    className="mb-1 inline-flex text-slate-800 hover:text-slate-900"
                >
                    <h2 className="text-xl font-semibold leading-snug">
                        {campaign?.name}
                    </h2>
                </Link>
<<<<<<< HEAD
                <div className="text-sm line-clamp-4">{campaign?.description}</div>
            </div>
            <footer className="mt-5">
                <div className="mb-2 text-sm font-semibold text-indigo-600">
                    {getFormattedDate(campaign?.startDate).fullDate}{" "}
                    <span className="text-slate-400">-&gt;</span>{" "}
=======
                <div className="text-sm line-clamp-4">
                    {campaign?.description}
                </div>
            </div>
            <footer className="mt-5">
                <div className="mb-2 text-sm font-semibold text-indigo-600">
                    {getFormattedDate(campaign?.startDate).fullDate}{' '}
                    <span className="text-slate-400">-&gt;</span>{' '}
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                    {getFormattedDate(campaign?.endDate).fullDate}
                </div>
                <ul className="mt-4 space-y-2">
                    <FeaturedItem>
                        <IoPerson />
                        <span>
<<<<<<< HEAD
              NPH đã được duyệt / đồng ý tham gia:{" "}
                            {
                                campaign?.participations?.filter(
                                    (p) =>
                                        p.status === ParticipationStatuses.ISSUER_ACCEPTED.id ||
                                        p.status === ParticipationStatuses.SYSTEM_APPROVED.id,
                                )?.length
                            }
            </span>
=======
                            NPH đã được duyệt / đồng ý tham gia:{' '}
                            {
                                campaign?.participations?.filter(
                                    (p) =>
                                        p.status ===
                                            ParticipationStatuses
                                                .ISSUER_ACCEPTED.id ||
                                        p.status ===
                                            ParticipationStatuses
                                                .SYSTEM_APPROVED.id
                                )?.length
                            }
                        </span>
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                    </FeaturedItem>
                    <FeaturedItem>
                        <IoBusiness />
                        <span>
<<<<<<< HEAD
              Tổ chức:{" "}
                            {/* {campaign?.organizationCampaigns &&
              campaign?.organizationCampaigns?.length > 0
                ? campaign?.organizationCampaigns
                    ?.map((o) => o?.organization?.name)
                    .join(", ")
                : "Chưa có"} */}
                            {organization?.organization?.name}
            </span>

=======
                            Tổ chức:{' '}
                            {campaign?.organizationCampaigns &&
                            campaign?.organizationCampaigns?.length > 0
                                ? campaign?.organizationCampaigns
                                      ?.map((o) => o?.organization?.name)
                                      .join(', ')
                                : 'Chưa có'}
                        </span>
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
                    </FeaturedItem>
                    <FeaturedItem>
                        <IoLocation />
                        <span>{campaign?.address}</span>
                    </FeaturedItem>
                </ul>
                {/*{loginUser?.role === Roles.SYSTEM.id && (*/}
                {/*    <SystemActions campaign={campaign} />*/}
                {/*)}*/}
                {/*{loginUser?.role === Roles.ISSUER.id && (*/}
                {/*    <IssuerActions*/}
                {/*        participationOfIssuer={participationOfIssuer}*/}
                {/*        campaign={campaign}*/}
                {/*    />*/}
                {/*)}*/}
            </footer>
        </div>
    );
};

export default AdminCampaignCard;

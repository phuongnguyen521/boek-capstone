<<<<<<< HEAD
import React, { useContext } from "react";
import { CampaignFormats } from "../../constants/CampaignFormats";
import { Roles } from "../../constants/Roles";
import { useAuth } from "../../context/AuthContext";
import { CampaignContext } from "../../context/CampaignContext";
import SidebarIssuersTable from "./SidebarIssuersTable";
import SidebarStaffsTable from "./SidebarStaffsTable";
import SidebarActions from "./SidebarActions";

const Sidebar: React.FC = () => {
    const { loginUser } = useAuth();
    const campaign = useContext(CampaignContext);

    return (
        <div>
            <div className="space-y-4 lg:sticky lg:top-20">

                {
                    (loginUser?.role === Roles.SYSTEM.id || loginUser?.role === Roles.ISSUER.id) &&
                    <SidebarActions />
                }

                <SidebarIssuersTable />

                {loginUser?.role === Roles.SYSTEM.id &&
                    campaign?.format === CampaignFormats?.OFFLINE.id && (
                        <SidebarStaffsTable />
                    )}
=======
import React from 'react';
import SidebarIssuersTable from './SidebarIssuersTable';
import { IUser } from '../../types/user/IUser';
import SidebarActionButtons from './SidebarActionButtons';
import { ICampaign } from '../../types/campaign/ICampaign';
import { useAuth } from '../../context/AuthContext';
import { Roles } from '../../constants/Roles';

type Props = {
    campaign: ICampaign | undefined;
    issuers: IUser[];
};

const Sidebar: React.FC<Props> = ({ campaign, issuers }) => {
    const { loginUser } = useAuth();
    return (
        <div>
            <div className="space-y-4 lg:sticky lg:top-20">
                {/* 1st block */}
                {loginUser && loginUser?.role === Roles.ISSUER.id && (
                    <SidebarActionButtons
                        campaign={campaign}
                        issuers={issuers}
                    />
                )}
                {/* 2nd block */}
                <SidebarIssuersTable issuers={issuers} />
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
            </div>
        </div>
    );
};

export default Sidebar;

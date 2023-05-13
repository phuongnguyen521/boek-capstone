<<<<<<< HEAD
import AdminLayout from "../../components/Layout/AdminLayout";
import React, { ReactElement } from "react";

import { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout = () => {
    return <p>Issuer Dashboard</p>;
};
Page.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
=======
import { NextPage } from 'next';
import AdminLayout from '../../components/Layouts/AdminLayout';
import React from 'react';
import WelcomeBanner from '../../components/Admin/Dashboard/WelcomeBanner';

const DashboardPage: NextPage = () => {
    return (
        <AdminLayout>
            <WelcomeBanner />
        </AdminLayout>
    );
};

export default DashboardPage;
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb

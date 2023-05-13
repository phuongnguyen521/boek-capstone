<<<<<<< HEAD
import React from "react";
=======
import React from 'react';
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb

type Props = {
    children: React.ReactNode;
};

const SidebarBlockWrapper: React.FC<Props> = ({ children }) => {
    return (
<<<<<<< HEAD
        <div className="rounded-sm border border-slate-200 bg-white p-5 shadow lg:w-72 xl:w-80 empty:hidden">
=======
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow lg:w-72 xl:w-80">
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
            {children}
        </div>
    );
};

export default SidebarBlockWrapper;

<<<<<<< HEAD
import React from "react";
=======
import React from 'react';
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb

const ContentHeader: React.FC<{ text: string }> = ({ text }) => {
    return (
        <h2 className="mb-22 text-xl font-bold leading-snug text-slate-800">
            {text}
        </h2>
    );
};
export default ContentHeader;

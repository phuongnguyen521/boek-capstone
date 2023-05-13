<<<<<<< HEAD
import React from "react";
=======
import React from 'react';
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb

const EmptySection: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className="py-6 text-center">
            <p className="text-slate-600">{text}</p>
        </div>
    );
};

export default EmptySection;

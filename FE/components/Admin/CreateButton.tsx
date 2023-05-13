<<<<<<< HEAD
import React, { memo } from "react";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";

type Props = {
    href?: string;
    onClick?: () => void;
    label: string;
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const CreateButton: React.FC<Props> = ({ label, onClick, href, className, ...rest }) => {
    const commonProps = {
        className: `m-btn gap-1 bg-indigo-500 text-white hover:bg-indigo-600 ${className} disabled:opacity-50 disabled:cursor-not-allowed`,
        ...rest,
    };

    const children = (
        <>
            <IoAdd size={16} />
            <span className="hidden sm:block">{label}</span>
        </>
    );
    return href ? (
        <Link href={href} {...commonProps}>
            {children}
        </Link>
    ) : (
        <button type="button" onClick={onClick} {...commonProps}>
            {children}
        </button>
    );
};

export default memo(CreateButton);
=======
import React from 'react';
import { IoAdd } from 'react-icons/io5';
import Link from 'next/link';

type Props = {
    label: string;
    onClick?: () => void;
    href?: string;
};

const CreateButton: React.FC<Props> = ({ label, onClick, href }) => {
    return (
        <Link
            href={href || '#'}
            onClick={onClick}
            className={
                'm-btn gap-1 bg-indigo-500 text-white hover:bg-indigo-600'
            }
        >
            <IoAdd size={16} />
            <span>{label}</span>
        </Link>
    );
};

export default CreateButton;
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb

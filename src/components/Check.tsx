import React from 'react';

interface CheckProps {
    text: string;
    value: string;
    className?: string;
    selected: boolean;
    onChange: (value: string) => void;
}

const Check: React.FC<CheckProps> = ({ text, value, selected, onChange, className }) => {
    const handleChange = () => {
        onChange(value);
    }

    return (
        <div
            className={`cursor-pointer rounded-md px-4 py-2 text-center ${className} ${
                selected ? 'bg-primary text-primary-dark' : 'bg-primary-dark text-white'
            }`}
            onClick={handleChange}
        >
            {text}
        </div>
    );
};

export default Check;
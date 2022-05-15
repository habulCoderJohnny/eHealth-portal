import React from 'react';
import './Spinner.css';

const Loading = () => {
    return (
        <div className="flex items-center justify-center ">
            <div className="lds-hourglass text-red-400"></div>
        </div>
    );
};

export default Loading;


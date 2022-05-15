import React from 'react';

const ErrorMassage = ({children}) => {
    return (
        <div class="bg-orange-100 border-l-4 rounded border-orange-500 text-orange-700 p-4" role="alert">
        <p class="font-bold text-red-500">Authority says:</p>
        <p>{children}</p>
      </div>
    );
};

export default ErrorMassage;
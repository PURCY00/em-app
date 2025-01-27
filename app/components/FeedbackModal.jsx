import React from "react";

const FeedbackModal = ({ show, onClose, feedback }) => {
    if (!show) return null;

    const isError = feedback?.status === "Error";
    const icon = isError ? (
        <svg className='h-6 w-6 text-red-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
        </svg>
    ) : (
        <svg className='h-6 w-6 text-green-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
        </svg>
    );

    const bgColor = isError ? "bg-red-100" : "bg-green-100";
    const textColor = isError ? "text-red-600" : "text-green-600";

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='fixed inset-0 bg-black opacity-50'></div>
            <div className='bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full'>
                <div className='px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                    <div className='sm:flex sm:items-start'>
                        <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${bgColor} sm:mx-0 sm:h-10 sm:w-10`}>
                            {icon}
                        </div>
                        <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                            <h3 className={`text-lg leading-6 font-medium ${textColor}`}>{feedback?.status}</h3>
                            <div className='mt-2'>
                                <p className={`text-sm text-gray-500`}>{feedback?.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                    <button
                        type='button'
                        className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;

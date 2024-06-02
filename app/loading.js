'use client'
import { Icon } from "@iconify/react";

// app/loading.js
const Loading = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <Icon className={`animate-spin text-5xl text-emBlue`}  icon='gg:spinner-alt' />
            <p className='mt-4 text-xl text-emBlue font-bold'>Loading...</p>
        </div>
    );
};

export default Loading;

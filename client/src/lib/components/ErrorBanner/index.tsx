import React from 'react';
import {Alert } from 'antd';

interface Props{
    message?:string;
    description?:string;
}


export const ErrorBanner = ({message="Something Went Wrong",description="Looks like sometings are not in place... Check your connection or try again please."}:Props) => {
    return (
        <Alert
            banner
            closable
            message={message}
            description={description}
            type="error"
            showIcon
            className='errpr-banner'
        />
    )
}
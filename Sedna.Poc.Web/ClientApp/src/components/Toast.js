import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export const Toast = forwardRef(({}, ref) => {
    const [showToast, setShowToast] = useState(false);
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')
    
    useEffect(() => {
        let timeout
        if (showToast)
            timeout = setTimeout(() => {
                setShowToast(false)
            }, 5000)

        return () => clearTimeout(timeout)
    }, [showToast])
    
    useImperativeHandle(ref, () => ({
        show: (customSuccess, customMessage) => {
            setShowToast(true)
            setSuccess(customSuccess)
            setMessage(customMessage)
        }
    }))

    // Function to close the toast
    const closeToast = () => {
        setShowToast(false);
    };

    // Return null if toast should not be shown
    if (!showToast) return null;

    return (
        <div className='' style={{ position: 'absolute', bottom: '20px', right: '40px', zIndex: '25' }}>
            <div className="row" style={{ backgroundColor: success ? 'rgba(199, 255, 212)' : 'rgba(255, 222, 222)' , height: '100px', width: '300px', borderRadius: '5px' }}>
                <div className='col-1 p-0 m-0' style={{ backgroundColor: success ? 'green' : 'red' , maxWidth: '10px', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px' }}> </div>
                <div className='col-2 p-0 m-0 d-flex mt-4 justify-content-center'>
                    {success ? (
                        <FontAwesomeIcon icon={faCheck} style={{ height: '30px', color: 'green' }} />
                    ) : (
                        <FontAwesomeIcon icon={faCircleXmark} style={{ height: '30px', color: 'red' }} />
                    )}
                </div>
                <div className='col-8 p-0 m-0 mt-4'  style={{ color: success ? 'green' : 'red' }}>
                    <strong className="me-auto">{success ? 'Success' : 'Error'}</strong>
                    <p className='p-0 m-0'>
                        {message}
                    </p>
                </div>
                <div className='col-1 p-0 m-0 mt-4'>
                    <button type="button" className='link-btn' onClick={closeToast}>
                        <FontAwesomeIcon icon={faXmark} style={{ height: '20px', color: success ? 'green' : 'red' }} />
                    </button>
                </div>
            </div>
        </div>
    );
});

import React from 'react'
import {useNavigate} from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className='col d-flex flex-column align-items-center mt-5'>
            <h2 className="fw-bold">Not Found</h2>
            <button className="btn btn-secondary" onClick={() => navigate("/users")}>Return
                Home
            </button>
        </div>
    )
}
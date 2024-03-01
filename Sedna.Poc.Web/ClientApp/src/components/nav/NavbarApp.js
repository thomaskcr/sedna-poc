import React, { useEffect, useState } from 'react'

import userStore from "../../store/userStore";
import { Auth } from "aws-amplify";
import { useNavigate } from 'react-router-dom';

var md5 = require('md5');

export const NavMenu = () => {
    const displayName = userStore(state => state.displayName);
    const clearUser = userStore(state => state.clearUser)
    const navigate = useNavigate()
    const userEmail = userStore(state => state.email);
    const [gravatarCode, setGravitarCode] = useState(null);

    useEffect(() => {
        setGravitarCode(md5(userEmail));
    })

    return (
        <nav className="layout-navbar navbar navbar-expand-lg align-items-lg-center bg-white container-p-x" id="layout-navbar">

            <a href="index.html" className="navbar-brand app-brand demo d-lg-none py-0 mr-4">
                <span className="app-brand-logo demo bg-primary">
                </span>
                <span className="app-brand-text demo font-weight-normal ml-2">Sedna POC</span>
            </a>

            <div className="layout-sidenav-toggle navbar-nav d-lg-none align-items-lg-center mr-auto">
                <a className="nav-item nav-link px-0 mr-lg-4" href="#">
                    <i className="ion ion-md-menu text-large align-middle"></i>
                </a>
            </div>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#layout-navbar-collapse">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-collapse collapse" id="layout-navbar-collapse">
                <hr className="d-lg-none w-100 my-2" />

                <div className="navbar-nav align-items-lg-center ml-auto">
                    <div className="nav-item d-none d-lg-block text-big font-weight-light line-height-1 opacity-25 mr-3 ml-1">|</div>

                    <div className="demo-navbar-user nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                            <span className="d-inline-flex flex-lg-row-reverse align-items-center align-middle">
                                <img src={"https://www.gravatar.com/avatar/" + gravatarCode + "?d=retro&s=30"} className="d-block ui-w-30 rounded-circle" />
                                <span className="px-1 mr-lg-2 ml-2 ml-lg-0">{displayName}</span>
                            </span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a onClick={() => Auth.signOut().then(() => {
                                clearUser()
                                navigate("/login")
                            })} className="dropdown-item"><i className="ion ion-ios-log-out text-danger"></i> &nbsp; Log Out</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

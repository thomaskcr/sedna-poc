import React from 'react'
import { Auth } from "aws-amplify";
import br_logo_full from '../platform/assets/br_logo_full.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons'
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons'

export const Login = () => {
    return (
        <>
            <div className="authentication-wrapper">
                <div className="authentication-inner py-5">
                    <div className="card">
                        <div className="p-sm-4">
                            <div className="d-flex justify-content-center align-items-center pb-2 mb-2">
                                <div className="ui-w-60">
                                    <div className="w-100 position-relative">
                                        <img src={br_logo_full} style={{ width: "300px" }}></img>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-center mb-4">Sedna Projects</h4>
                            <hr />
                            <h5 className="text-center text-muted font-weight-normal mb-3">Login with a provider below:</h5>
                            <div className="text-center">
                                <button className="text-center btn btn-lg btn-primary mb-2" style={{ width: "200px" }} onClick={() => Auth.federatedSignIn({ provider: "br-office365-ad" })}><FontAwesomeIcon icon={faMicrosoft} className="mr-2" /> Office 365</button>
                                <br />
                                <button className="text-center btn btn-lg btn-primary mb-2" style={{ width: "200px" }} onClick={() => Auth.federatedSignIn()}><FontAwesomeIcon icon={faLaptopCode} className="mr-2" /> Developer</button>
                            </div>
                        </div>
                        <div className="card-footer py-3 px-4 px-sm-5">
                            <div className="text-center text-muted">
                                Need help? Use the <a href="https://brightoncromwell.atlassian.net/servicedesk/customer/portal/1" target="_blank">Blue Raven Service Desk</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
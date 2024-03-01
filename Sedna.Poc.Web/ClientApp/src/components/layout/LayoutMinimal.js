import { Navigate, Outlet } from "react-router-dom";
import bc_logo_only from '../../platform/assets/bc_logo_only.png'

export const LayoutMinimal = (props) => {
    return (
        <>
            <div className="layout-inner">

                <div className="layout-container">
                    <div className="layout-content">
                        {props.children}
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}
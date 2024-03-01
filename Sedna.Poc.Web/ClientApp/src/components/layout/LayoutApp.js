import {SideBar} from '../nav/SidebarApp';
import {NavMenu} from '../nav/NavbarApp';
import {Outlet} from "react-router-dom";

export const LayoutApp = () => {
    return (
        <>
            <div className="layout-inner">
                {<SideBar/>}
                <div className="layout-container">
                    <NavMenu/>
                    <div className="layout-content≠">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    );
}

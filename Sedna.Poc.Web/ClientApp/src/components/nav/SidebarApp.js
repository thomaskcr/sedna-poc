import bc_logo_only from '../../platform/assets/br_logo_sm.png'

export const SideBar = ({ toggle }) => {
    return (
        <div id="layout-sidenav" className='layout-sidenav sidenav sidenav-vertical bg-dark col'>
            {/* <div id="layout-sidenav" className={isOpen ? 'layout-sidenav sidenav sidenav-vertical bg-dark' : 'layout-sidenav-horizontal container-p-x flex-grow-0 bg-dark'}>*/}
            <div className="app-brand">
                <span className="app-brand-logo">
                    <router-link to="/" className="navbar-brand">
                        <img src={bc_logo_only} alt="Logo" />
                    </router-link>
                </span>
                <router-link to="/" className="app-brand-text sidenav-text font-weight-normal">
                    <span style={{ fontWeight: "300", color: "white", paddingLeft: "10px", fontSize: "18px" }}>Sedna</span>
                    <span style={{ fontWeight: "100", color: "white", paddingLeft: "5px", fontSize: "18px" }}>POC</span>
                </router-link>
                <a onClick={toggle} href="#" className="layout-sidenav-toggle sidenav-link text-large ml-auto">
                    <i className="ion ion-md-menu align-middle"></i>
                </a>
            </div>

            <div className="sidenav-divider mt-0"></div>
                <div className="row m-0 p-0 mb-3 d-flex justify-content-center">
                    <button
                        className="btn btn-outline-secondary link-btn d-flex justify-content-between align-items-center"
                        type="button"
                        style={{ width: '190px', fontWeight: 500 }}>
                        <div>
                            <i className="mr-2 fa-solid fa-house" style={{ color: '#848891' }}></i>POC Dashboard
                        </div>
                    </button>
            </div>
            <div className="sidenav-divider mt-0"></div>
            <div style={{ width: '100%' }}>
                <div className="row m-0 p-0 mt-3 d-flex justify-content-center">
                    <button
                        className="btn btn-outline-secondary link-btn d-flex justify-content-between align-items-center"
                        type="button"
                        style={{ width: '190px', fontWeight: 500 }}>
                        <div>
                            <i className="mr-2 fa-solid fa-hand-holding-dollar" style={{ color: '#848891' }}></i>
                            Users
                        </div>
                    </button>
                </div>
            </div>
            <div className="sidenav-divider mt-0"></div>
        </div >
    )
}
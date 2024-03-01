import { NavMenu } from '../nav/NavMenu';

export const LayoutBase = (props) => {
    return (
        <>
            <div className="layout-wrapper layout-2">
                {props.children}
            </div>
        </>
    );
}

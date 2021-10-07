import React from 'react'
import {useHistory} from 'react-router-dom'
import LoadingOverlay from 'react-loading-overlay';
// import {useSelector} from "react-redux";
// import {ToastContainer} from "react-toastify";

const ThePublicLayout = ({component: Component}) => {
    const history = useHistory();
    // const statusLoading = useSelector(state => state.globalLoading.status);
    let token = localStorage.getItem('accessToken');
    if (token !== null) {
        history.push('/dashboard');
    }

    return (
        <LoadingOverlay
            // active={statusLoading}
            spinner
        >
            <Component/>
        </LoadingOverlay>
    )
};

export default ThePublicLayout

import React from 'react';
import TopNav from "../../components/top-nav/TopNav";
import {Link, Outlet} from "react-router-dom";
import storageUtils from "../../utils/storageUtils";
import Search from "../../components/search/Search";

const Customer = () => {
    return (
        <div>
            <header>
                <TopNav/>
                Hello,<Link to={'profile'}>{storageUtils.getUser().username}!</Link>
            </header>
            <Link to={'customerSearch'}>Search new products!</Link>
            <Outlet/>
        </div>
    );
};

export default Customer;
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
            <Link to={'customerSearch'}>Search new products!</Link><br/>
            <Link to={'order'}>Your Cart</Link><br/>
            <Link to={'history'}>history</Link>
            <Outlet/>
        </div>
    );
};

export default Customer;
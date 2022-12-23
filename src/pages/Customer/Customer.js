import React from 'react';
import TopNav from "../../components/top-nav/TopNav";
import {Link, Outlet} from "react-router-dom";
import storageUtils from "../../utils/storageUtils";
import Search from "../../components/search/Search";
import classes from './Customer.module.css';


const Customer = () => {
    return (
        <>
            <header className={classes.header}>
                <TopNav/>
                <div className={classes.hello}>Hello,<Link to={'profile'}>{storageUtils.getUser().username}!</Link></div>
            </header>
            <div className={classes.navbar}>
                <Link to={'customerSearch'} className={classes.Link}>Search new products!</Link>
                <Link to={'order'} className={classes.Link}>Your Cart</Link>
                <Link to={'history'} className={classes.Link}>history</Link>
            </div>
            <Outlet/>
        </>
    );
};

export default Customer;
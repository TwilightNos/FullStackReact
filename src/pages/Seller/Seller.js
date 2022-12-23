import React from 'react';
import ShowItem from "../../components/showItem/ShowItem";
import TopNav from "../../components/top-nav/TopNav";
import AddItem from "../../components/addItem/AddItem";
import {Link, Outlet} from "react-router-dom";
import storageUtils from "../../utils/storageUtils";
import classes from './Seller.module.css';

const Seller = () => {
    return (
        <div>
            <header className={classes.header}>
                <TopNav/>
                <div className={classes.hello}>Hello,<Link to={'profile'}>{storageUtils.getUser().username}!</Link></div>
            </header>
            <div className={classes.navbar}>
                <Link to={'addItem'} className={classes.Link}>Add Item</Link>
                <Link to={'showItem'} className={classes.Link}>Show Item</Link>
            </div>
            <Outlet/>
        </div>
    );
};

export default Seller;
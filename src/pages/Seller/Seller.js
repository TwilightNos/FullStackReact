import React from 'react';
import ShowItem from "../../components/showItem/ShowItem";
import TopNav from "../../components/top-nav/TopNav";
import AddItem from "../../components/addItem/AddItem";
import {Link, Outlet} from "react-router-dom";
import storageUtils from "../../utils/storageUtils";

const Seller = () => {
    return (
        <div>
            <header>
                <TopNav/>
                Hello,<Link to={'profile'}>{storageUtils.getUser().username}!</Link>
            </header>
            <AddItem/>
            <ShowItem/>
            <Outlet/>
        </div>
    );
};

export default Seller;
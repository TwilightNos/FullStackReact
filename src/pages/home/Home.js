import React, {useEffect} from 'react';
import storageUtils from "../../utils/storageUtils";
import {useNavigate} from "react-router-dom";
import TopNav from "../../components/top-nav/TopNav";

const Home = () => {

    const navigate = useNavigate();
    useEffect(()=>{
        if(JSON.stringify(storageUtils.getUser())==="{}"){
            navigate('/login');
        }
    },[])

    return (
        <div>
            <TopNav/>
        </div>
    );
};

export default Home;
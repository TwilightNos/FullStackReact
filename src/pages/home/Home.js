import React, {useContext, useEffect} from 'react';
import storageUtils from "../../utils/storageUtils";
import {useNavigate} from "react-router-dom";
import TopNav from "../../components/top-nav/TopNav";
import UserContext from "../../context/context";

const Home = () => {

    const usercxt = useContext(UserContext);


    const navigate = useNavigate();
    useEffect(()=>{
        const url = usercxt.identity?'customer':'seller'
        if(JSON.stringify(storageUtils.getUser())==="{}"){
            navigate('/login');
        }else{
            navigate(`/${url}`);
        }
    },[])

    return (
        <div>
            <TopNav/>
        </div>
    );
};

export default Home;
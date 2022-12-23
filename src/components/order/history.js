import React, {useCallback, useContext, useEffect, useState} from 'react';
import UserContext from "../../context/context";
import itemContext from "../../context/itemContext";
import {customerUrl, generalUrl} from "../../urls/url";
import HistoryDetails from "./historyDetails";
import classes from './history.module.css';

const History = () => {

    const usercxt = useContext(UserContext);
    const itemcxt = useContext(itemContext);

    const [orderData,setOrderData] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [maxPage,setMaxPage] = useState(1);

    const [page,setPage] = useState(1);

    const fetchData = useCallback(async (page)=>{
        setIsLoading(true);
        const res = await fetch(`${generalUrl}/customer/history/${page}`,{
            method:'POST',
            body:JSON.stringify({
                email:usercxt.email,
            })
        });
        if(res.ok){
            const response = await res.json();
            setOrderData(response.history);
            setMaxPage(response.max_page);
            setIsLoading(false);
        }
    },[])
    useEffect(()=>{
        fetchData(page);
    },[fetchData,page])

    const prevPageClickHandler = () => {
        if(page>1){
            setPage(prevState => prevState-1);
        }
    }
    const nextPageClickHandler = () => {
        if(page<maxPage){
            setPage(prevState => prevState+1);
        }
    }


    return (
        <div className={classes.history}>
            <div className={classes.orderDetails}>{(!isLoading&&orderData)&&orderData.map(item=><HistoryDetails item={item} key={item[0]}/>)}</div>
            <div className={classes.pages}>
                <button onClick={prevPageClickHandler} disabled={page<=1}>{"<<"}</button>
                {page}
                <button onClick={nextPageClickHandler} disabled={page>=maxPage}>{">>"}</button>
            </div>
        </div>
    );
};

export default History;
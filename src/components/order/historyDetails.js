import React, {useCallback, useEffect, useState} from 'react';
import {compositeUrl, customerUrl, generalUrl, orderUrl} from "../../urls/url";
import {useNavigate} from "react-router-dom";
import classes from './historyDetails.module.css';

const HistoryDetails = (props) => {

    const navigate = useNavigate();

    const [showDetail,setShowDetail] = useState(false);
    const [orderDetail,setOrderDetail] = useState([]);

    const fetchOrder = useCallback(async ()=>{

        const res = await fetch(`${generalUrl}/customer/order_details`,{
            method:"POST",
            body:JSON.stringify({
                oid:props.item[0]
            })
        });
        if(res.ok){
            const response = await res.json();
            console.log(response);
            setOrderDetail(response.data)
        }
    },[]);
    useEffect(()=>{
        fetchOrder();
    },[fetchOrder])

    const showOrderDetail = () =>{
        setShowDetail(prevState => !prevState);
    }

    const redirectToSearch = (itemName) =>{
        navigate('/customer/customerSearch',{state:{name:itemName},replace:true});
    }


    return (
        <div className={classes.OrderDetails}>
            <ul className={classes.ul}>
                <li onClick={showOrderDetail} className={classes.OrderID}>Order ID: {props.item[0]}</li>
                <li>Time: {props.item[1]}</li>
                {showDetail&&orderDetail.map(item=><div className={classes.itemName} onClick={()=>{
                    redirectToSearch(item.name);
                }}>
                    {/*id:{item.id}<br/>*/}
                    name:{item.name}<br/>
                    amount:{item.amount}<br/>
                </div>)}
            </ul>

        </div>
    );
};

export default HistoryDetails;
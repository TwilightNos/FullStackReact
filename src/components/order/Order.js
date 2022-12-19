import React, {useCallback, useContext} from 'react';
import UserContext from "../../context/context";
import itemContext from "../../context/itemContext";
import OrderDetails from "./OrderDetails";
import {compositeUrl, customerUrl, generalUrl} from "../../urls/url";
import {useNavigate} from "react-router-dom";

const Order = () => {

    const usercxt = useContext(UserContext);
    const itemcxt = useContext(itemContext);

    const navigate = useNavigate();

    const placeOrder = useCallback(async (timestamp)=>{
        const res = await fetch(`${generalUrl}/customer/purchase`,{
            method:'POST',
            body:JSON.stringify({
                email:usercxt.email,
                timestamp:timestamp,
                items:itemcxt.items.map(item=>{
                    return {
                        mid:item.id,
                        amount:item.amount,
                    }
                })
            })
        });
        if(res.ok){
            const response = await res.json();
            console.log(response);
            itemcxt.items = [];
            itemcxt.totalPrice = 0;
            itemcxt.totalAmount = 0;
        }
    },[])


    const purchaseClickHandler = () =>{
        if(usercxt.address!==''){
            console.log(itemcxt.items)
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth()+1;
            const day = date.getDate();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const second = date.getSeconds();

            const timestamp = year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
            placeOrder(timestamp);
            navigate('/customer/customerSearch');
        }else{
            alert('Please Add Your Address First!');
            navigate('/customer/profile');
        }

    }



    return (
        <div>
            {itemcxt.items.map(item=><OrderDetails item={item} key={item.index}/>)}
            total price:{itemcxt.totalPrice} <br/>
            <button onClick={purchaseClickHandler}>Purchase</button>
        </div>
    );
};

export default Order;
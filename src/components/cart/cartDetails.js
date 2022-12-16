import React, {useContext, useEffect, useState} from 'react';
import ModifyItemDetail from "./ModifyItemDetail";
import {sellerUrl} from "../../urls/url";
import UserContext from "../../context/context";
import itemContext from "../../context/itemContext";

const CartDetails = (props) => {
    const [isModify,setIsModify] = useState(false);
    const [haveItem,setHaveItem] = useState(false);

    const usercxt = useContext(UserContext);
    const itemcxt = useContext(itemContext);
    const [currItemAmount,setCurrItemAmount] = useState(0);
    const clickModifyHandler = () => {
        setIsModify(prevState => !prevState);
    }

    const addToCartClickHandler = () => {
        itemcxt.items.splice(0,0,{
            id:props.item[0],
            name:props.item[1],
            price:props.item[2],
            amount:1
        })
        itemcxt.totalAmount += 1;
        itemcxt.totalPrice += props.item[2];
        setHaveItem(true);

        const index = itemcxt.items.indexOf(itemcxt.items.find((item)=>{
            return item.id === props.item[0];
        }));
        setCurrItemAmount(itemcxt.items[index].amount);
    }

    const addAmountHandler = () => {
        const index = itemcxt.items.indexOf(itemcxt.items.find((item)=>{
            return item.id === props.item[0];
        }));
        itemcxt.items[index].amount+=1;
        itemcxt.totalAmount += 1;
        itemcxt.totalPrice += props.item[2];
        setCurrItemAmount(itemcxt.items[index].amount);
        console.log(itemcxt);
    }
    const subAmountHandler = () => {
        const index = itemcxt.items.indexOf(itemcxt.items.find((item)=>{
            return item.id === props.item[0];
        }));
        itemcxt.items[index].amount-=1;
        itemcxt.totalAmount -= 1;
        itemcxt.totalPrice -= props.item[2];
        setCurrItemAmount(itemcxt.items[index].amount);
        if(itemcxt.items[index].amount===0){
            setHaveItem(false);
            itemcxt.items.splice(index,1);
        }
    }

    useEffect(()=>{
        const index = itemcxt.items.indexOf(itemcxt.items.find((item)=>{
            return item.id === props.item[0];
        }));
        if(index!==-1){
            setCurrItemAmount(itemcxt.items[index].amount);
            setHaveItem(true);
            console.log(currItemAmount);
        }
    })


    const deleteItemHandler = () => {
        async function deleteData(){
            const res = await fetch(`${sellerUrl}/seller/delete_item`,{
                method:'POST',
                body:JSON.stringify({
                    email:usercxt.email,
                    mid:props.item[0],
                })
            })
            if(res.ok){
                const response = await res.json();
                console.log(response);
                itemcxt.fetchData();
            }
        }
        deleteData();

    }

    return (
        <div>
            {!isModify&&<ul>
                <li>name: {props.item[1]}</li>
                <li>price: {props.item[2]}</li>
                <li>amount: {props.item[3]}</li>
                <li>description: {props.item[4]}</li>
                <li><img src={props.item[5]} alt=""/></li>
            </ul>}
            {isModify&&<ModifyItemDetail item = {props.item}/>}
            {isModify&&<button onClick={clickModifyHandler}>Cancel</button>}<br/>
            {usercxt.identity?null:<button onClick={clickModifyHandler}>Modify</button>}
            {usercxt.identity?null:<button onClick={() => {
                deleteItemHandler();
            }}>Delete</button>}
            {usercxt.identity?
                haveItem?
                    <div>
                        <button onClick={addAmountHandler}>+</button>
                        {currItemAmount}
                        <button onClick={subAmountHandler}>-</button>
                    </div>
                    :<button onClick={addToCartClickHandler}>Add to Cart</button>
                :null}
        </div>
    );
};

export default CartDetails;
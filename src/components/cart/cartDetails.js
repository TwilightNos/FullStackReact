import React, {useContext, useState} from 'react';
import ModifyItemDetail from "./ModifyItemDetail";
import {sellerUrl} from "../../urls/url";
import UserContext from "../../context/context";
import itemContext from "../../context/itemContext";

const CartDetails = (props) => {
    const [isModify,setIsModify] = useState(false);
    const usercxt = useContext(UserContext);
    const itemcxt = useContext(itemContext);

    const clickModifyHandler = () => {
        setIsModify(prevState => !prevState);
    }

    const addToCartChickHandler = () => {
        
    }

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
            {usercxt.identity?<button onClick={addToCartChickHandler}>Add to Cart</button>:null}
        </div>
    );
};

export default CartDetails;
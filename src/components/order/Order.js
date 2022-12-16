import React, {useContext} from 'react';
import UserContext from "../../context/context";
import itemContext from "../../context/itemContext";
import OrderDetails from "./OrderDetails";

const Order = () => {

    const usercxt = useContext(UserContext);
    const itemcxt = useContext(itemContext);

    const purchaseClickHandler = () =>{
        console.log(itemcxt.items)
    }



    return (
        <div>
            {itemcxt.items.map(item=><OrderDetails item={item} key = {item.index}/>)}
            total price:{itemcxt.totalPrice} <br/>
            <button onClick={purchaseClickHandler}>Purchase</button>
        </div>
    );
};

export default Order;
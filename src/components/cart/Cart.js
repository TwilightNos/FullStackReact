import React from 'react';
import CartDetails from "./cartDetails";

const Cart = (props) => {



    return (
        <div>
            {props.searchResult.map(item=><CartDetails item={item} key={item[0]}/>)}
        </div>
    );
};

export default Cart;
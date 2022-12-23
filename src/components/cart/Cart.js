import React from 'react';
import CartDetails from "./cartDetails";
import classes from './Cart.module.css'



const Cart = (props) => {



    return (
        <div className={classes.Cart}>
            {props.Result.map(item=><CartDetails item={item} key={item[0]}/>)}
        </div>
    );
};

export default Cart;
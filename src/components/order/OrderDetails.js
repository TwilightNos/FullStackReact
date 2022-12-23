import React from 'react';
import classes from './OrderDetails.module.css';


const OrderDetails = (props) => {
    return (
        <div className={classes.OrderDetails}>
            <ul>
                <li>name:{props.item.name}</li>
                <li className={classes.price}>{props.item.price}</li>
                <li>amount:{props.item.amount}</li>
            </ul>
        </div>
    );
};

export default OrderDetails;
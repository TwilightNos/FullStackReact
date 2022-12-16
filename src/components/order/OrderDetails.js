import React from 'react';

const OrderDetails = (props) => {
    return (
        <div>
            <ul>
                <li>name:{props.item.name}</li>
                <li>price:{props.item.price}</li>
                <li>amount:{props.item.amount}</li>
            </ul>
        </div>
    );
};

export default OrderDetails;
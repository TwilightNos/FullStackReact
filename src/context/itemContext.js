import React from "react";

const ItemContext = React.createContext({
    fetchData:()=>{},
    items:[],
    totalAmount:0,
    totalPrice:0
});

export default ItemContext;
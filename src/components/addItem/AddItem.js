import React, {useContext, useState} from 'react';
import {compositeUrl, generalUrl, sellerUrl} from "../../urls/url";
import UserContext from "../../context/context";
import itemContext from "../../context/itemContext";

const AddItem = () => {

    const usercxt = useContext(UserContext);
    const itemcxt = useContext(itemContext);

    const [isAdding,setIsAdding] = useState(false);

    const [itemInfo,setItemInfo] = useState({
        name:'',
        price:0,
        amount:0,
        description:'',
        url:'',
    });
    const nameChangeListener = (event) => {
        setItemInfo({
            ...itemInfo,
            name:event.target.value,
        })
    }
    const priceChangeListener = (event) => {
        setItemInfo({
            ...itemInfo,
            price: event.target.value,
        })
    }
    const amountChangeListener = (event) => {
        setItemInfo({
            ...itemInfo,
            amount: event.target.value,
        })
    }
    const descriptionChangeListener = (event) => {
        setItemInfo({
            ...itemInfo,
            description: event.target.value,
        })
    }
    const imageChangeListener = (event) => {
        setItemInfo({
            ...itemInfo,
            url: event.target.value,
        })
    }

    const addItemClickHandler = () =>{
        setIsAdding(true);
    }

    const submitNewItemHandler = (event) => {
        // event.preventDefault();
        const data = JSON.stringify({
            email:usercxt.email,
            name:itemInfo.name,
            price:itemInfo.price,
            remaining_amount:itemInfo.amount,
            description:itemInfo.description,
            picture:itemInfo.url
        });
        async function fetchData(){
            const res = await fetch(`${generalUrl}/seller/insert_merchandise`,{
                method:'POST',
                body:data
            });
            if(res.ok){
                const response = await res.json();
                console.log(response);
                alert('Success!');
                // itemcxt.fetchData();
            }
        }
        fetchData();
    }


    return (
        <div>
            {/*<button onClick={addItemClickHandler}>Add item</button>*/}
            <form onSubmit={submitNewItemHandler}>
                <label htmlFor="name">name:</label>
                <input type="text" name={"name"} onChange={nameChangeListener} required={true}/><br/>
                <label htmlFor="price">price:</label>
                <input type="number" name={"price"} onChange={priceChangeListener} required={true}/><br/>
                <label htmlFor="amount">amount:</label>
                <input type="number" name={"amount"} onChange={amountChangeListener} required={true}/><br/>
                <label htmlFor="description">description:</label>
                <input type="text" name={"description"} onChange={descriptionChangeListener} /><br/>
                <label htmlFor="url">image url:</label>
                <input type="text" name={"url"} onChange={imageChangeListener}/><br/>
                <button type={"submit"}>Confirm</button>
            </form>
        </div>
    );
};

export default AddItem;
import React, {useContext, useState} from 'react';
import seller from "../../pages/Seller/Seller";
import {generalUrl, sellerUrl} from "../../urls/url";
import UserContext from "../../context/context";
import {useNavigate} from "react-router-dom";

const ModifyItemDetail = (props) => {

    const navigate = useNavigate();
    const [itemInfo,setItemInfo] = useState({
        mid:props.item[0],
        name:props.item[1],
        price:props.item[2],
        amount:props.item[3],
        description:props.item[4],
        url:props.item[5],
    });

    const usercxt = useContext(UserContext);


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

    const submitForm = (event) => {
        // event.preventDefault();
        async function fetchData(){
            const res = await fetch(`${generalUrl}/seller/update_item`,{
                method:'POST',
                body:JSON.stringify({
                    email:usercxt.email,
                    mid:itemInfo.mid,
                    name:itemInfo.name,
                    price:itemInfo.price,
                    remaining_amount : itemInfo.amount,
                    description:itemInfo.description,
                    picture:itemInfo.url,
                })
            });
            if(res.ok){
                const response = await res.json();
                console.log(response);
                alert('Success!');
            }
        }
        fetchData();
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <label htmlFor="name">name:</label>
                <input type="text" name={"name"} defaultValue={props.item[1]} onChange={nameChangeListener}/><br/>
                <label htmlFor="price">price:</label>
                <input type="number" name={"price"} defaultValue={props.item[2]} onChange={priceChangeListener}/><br/>
                <label htmlFor="amount">amount:</label>
                <input type="number" name={"amount"} defaultValue={props.item[3]} onChange={amountChangeListener}/><br/>
                <label htmlFor="description">description:</label>
                <input type="text" name={"description"} defaultValue={props.item[4]} onChange={descriptionChangeListener}/><br/>
                <label htmlFor="url">image url:</label>
                <input type="text" name={"url"} defaultValue={props.item[5]} onChange={imageChangeListener}/><br/>
                <button type={"submit"}>Confirm</button>
            </form>
        </div>
    );
};

export default ModifyItemDetail;
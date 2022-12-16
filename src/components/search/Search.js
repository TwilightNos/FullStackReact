import React, {useCallback, useEffect, useState} from 'react';
import Cart from "../cart/Cart";
import {sellerUrl} from "../../urls/url";

const Search = () => {
    const [withSearchResult,setWithSearchResult] = useState(false);
    const [searchContent,setSearchContent] = useState({
        content:'',
        order:true, // true represents ascending
        lowestPrice:0,
        highestPrice:1000000
    });

    const [searchResult,setSearchResult] = useState('');

    const searchChangeHandler = (event) => {
        setSearchContent({
            ...searchContent,
            content: event.target.value
        })
    }

    const orderChangeHandler = (event) => {
        setSearchContent({
            ...searchContent,
            order:event.target.value
        })
    }

    const lowestPriceChangeHandler = (event) =>{
        setSearchContent({
            ...searchContent,
            lowestPrice: event.target.value,
        })
    }

    const highestPriceChangeHandler = (event) => {
        setSearchContent({
            ...searchContent,
            highestPrice: event.target.value
        })
    }

    const fetchData = useCallback(async ()=>{
        setWithSearchResult(false);
        const res = await fetch(`${sellerUrl}/customer/search`,{
            method:'POST',
            body:JSON.stringify({
                search_details:searchContent.content,
                filter_conditions:{
                    lowest_price:searchContent.lowestPrice,
                    highest_price:searchContent.highestPrice,
                    order:searchContent.order
                }
            })
        });
        if(res.ok){
            const data = await res.json();
            setSearchResult(data);
            setWithSearchResult(true);
        }
    },[])
    useEffect(()=>{
        fetchData();
    },[])

    const submitFormHandler = async (e) => {
        e.preventDefault();
        if (searchContent.highestPrice < searchContent.lowestPrice) {
            alert('illegal filter!');
        }
        if(searchContent.lowestPrice === ''){
            setSearchContent({
                ...searchContent,
                lowestPrice: 0
            })
        }
        if(searchContent.highestPrice===''){
            setSearchContent({
                ...searchContent,
                highestPrice: 1000000,
            })
        }
        console.log(searchContent);
        setWithSearchResult(false);
        const res = await fetch(`${sellerUrl}/customer/search`,{
            method:'POST',
            body:JSON.stringify({
                search_details:searchContent.content,
                filter_conditions:{
                    lowest_price:searchContent.lowestPrice,
                    highest_price:searchContent.highestPrice,
                    order:searchContent.order
                }
            })
        });
        if(res.ok){
            const data = await res.json();
            setSearchResult(data);
            setWithSearchResult(true);
        }
    }


    return (
        <div>
            <form onSubmit={submitFormHandler}>
                <label htmlFor="Search">Search:</label>
                <input type="text" placeholder={'please enter a product'} onChange={searchChangeHandler} id={'Search'}/><br/>
                <label htmlFor="Filter">Order</label><br/>
                <select name="" id="" onChange={orderChangeHandler}>
                    <option value={"increasing_order"}>From low to high</option>
                    <option value={"decreasing_order"}>From high to low</option>
                </select><br/>
                <label htmlFor="">Price range</label><br/>
                from <input type="number" onChange={lowestPriceChangeHandler}
                            placeholder={0}/>to<input type="number" onChange={highestPriceChangeHandler}
                                                      placeholder={0}/><br/>
                <button type={"submit"}>Search</button>
            </form>
            {withSearchResult && <Cart Result={searchResult}/>}
        </div>
    );
};

export default Search;
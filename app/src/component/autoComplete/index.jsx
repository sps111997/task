import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';

import TextField from "@mui/material/TextField";

import MenuItems from "../MenuItems";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading, setSearchResult } from "../../store/slice/searchSlice";
import './index.css';



const AutoComplete = () => {
    const [searchValue,setSearchValue] = useState("");
    const dispatch = useDispatch();
    const {searchRef} = useSelector((store)=>store.search);

    const fetchData = async(value)=>{
        try{
        const url = 'http://localhost:3000/search';
        const params = {
            name:value
        }
        dispatch(setLoading(true));
        const data = await axios.get(url,{params});
        dispatch(setSearchResult(data.data));
    }
    catch(err){
        console.error(err);
        dispatch(setError(true));
    }


    }

    const searchData = (e) =>{
        setSearchValue(e.target.value);
        fetchData(e.target.value);

    }
    
  return (
    <div className="container">
      <TextField id="outlined-basic" label="Search" variant="outlined" value={searchValue} onChange={searchData} sx={{width:'100%'}}/>
      {searchValue && <MenuItems />}
      {searchRef?.length && <p>you selected {searchRef}</p>}
    </div>
  );
};

export default AutoComplete;

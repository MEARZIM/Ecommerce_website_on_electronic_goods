import { MdClose } from "react-icons/md"
// import prod from "../../../assets/products/earbuds-prod-1.webp"
import "./Search.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch"

const Search = ({setShowSearch}) => {
    const [query, setQuery]= useState("")
    const navigate=useNavigate()
    
    
    const onchange = (e) =>{
        setQuery(e.target.value)
    }

    let {data} = useFetch(`/api/products?populate=*&[filters][title][$contains]=${query}`)
    //{console.log(data)}

    if (!query.length) {
        data=null
    }

    return <div className="search-modal">
        <div className="form-field">
            <input type="text" autoFocus placeholder="Search for Product" value={query} onChange={onchange}/>
            <MdClose onClick={()=>setShowSearch(false)} />
        </div>
        <div className="search-result-containt">
            <div className="search-result">

                {data?.data?.map((items)=>(

                <div key={items.id} className="search-result-item" onClick={()=> {
                    navigate("/product/"+items.id)
                    setShowSearch(false)
                }}>

                    <div className="img-container">
                        <img src={ 
                            process.env.REACT_APP_DEV_URL + items?.attributes?.img?.data?.[0]?.attributes?.url
                        } alt="" />
                    </div>

                <div className="prod-details">
                    <span className="name">{items.attributes.title}</span>
                    <span className="desc">{items.attributes.desc}</span>   
                </div>

                </div>
                ))}
            </div>
        </div>
    </div>;
};

export default Search;

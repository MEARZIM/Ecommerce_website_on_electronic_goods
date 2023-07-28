import { useState ,useContext} from "react";
import { FaFacebookF,FaTwitter,FaInstagram,FaLinkedinIn,FaPinterest,FaCartPlus } from "react-icons/fa"
import RelatedProduct from "./RelatedProducts/RelatedProducts"
// import ProImg from "../../assets/products/earbuds-prod-1.webp"
import  useFetch  from "../../hooks/useFetch";
import {useParams} from "react-router-dom"
import { Context } from "../../utils/context";
import "./SingleProduct.scss";



const SingleProduct = () => {
    const { handleAddToCart,email,setEmail } = useContext(Context)
    const [quantity,setQuantity] =useState(1)

    const {id} = useParams()
    const {data} = useFetch (
        `/api/products?populate=*&[filters][id]=${id}`
    )
    const decrement =()=>{
        if (quantity === 1){
            setQuantity(1)
        }
        else{
            setQuantity(prevState => prevState-1)
        }
    }
    const increment =()=>{
        setQuantity(prevState => prevState+1)
    }

    // console.log({data})
    // if(!data) return;
    const product = data?.data?.[0]?.attributes

     return <div className="single-product-main-content">
         <div className="layout">
            <div className="singe-product-page">
                <div className="left">
                    <img src={
                        process.env.REACT_APP_DEV_URL + product?.img?.data?.[0]?.attributes?.url
                    } alt="" />
                </div>
                <div className="right">
                    <span className="name">{product?.title}</span>
                    <span className="price">&#8377; {product?.price}</span>
                    <span className="desc">{product?.desc}</span>

                    <div className="cart-buttons">
                        <div className="quantity-buttons">
                            <span onClick={decrement}>-</span>
                            <span>{quantity}</span>
                            <span onClick={increment}>+</span>
                        </div>
                        <button className="add-to-cart-button" onClick={()=>{
                            if (email.length>=1) {
                                handleAddToCart(data?.data[0],quantity)
                                // console.log(data?.data[0])
                                setQuantity(1)
                            }else{
                               window.alert("Please Enter your Email Address");
                            }
                        }
                        }
                        >
                            <FaCartPlus size={20} />
                            ADD TO CART
                        </button>
                        <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email" required/>
                    </div>

                    <span className="divider"></span>
                    <div className="info-items">

                        <span className="text-bold">Categoty:{"  "}
                            <span className="headphone">{product?.categories?.data?.[0]?.attributes?.title}</span>
                        </span>

                        <span className="text-bold">Share: 
                        <span className="social-icons">
                            <FaFacebookF size={16} />
                            <FaTwitter size={16} />
                            <FaInstagram size={16} />
                            <FaLinkedinIn size={16} />
                            <FaPinterest size={16} />
                        </span>
                        </span>
                    </div>

                </div>
            </div>
        <RelatedProduct productid={id} categoryid={product?.categories?.data?.[0]?.id} />
        </div>
    </div>;
};

export default SingleProduct;

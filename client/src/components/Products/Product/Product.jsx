import "./Product.scss";
import { useNavigate } from "react-router-dom"
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai"
import { useContext, useState } from "react";
import { Context } from "../../../utils/context";
import useFetch from "../../../hooks/useFetch"

const Product = ({ id, data }) => {
    const { handleAddToWishlist, handleRemoveFromWishlist, email } = useContext(Context)
    const [isLiked, setIsLiked] = useState(false);
    const [count, setCount] = useState(1);
    const navigate = useNavigate();

    const dataitem = useFetch(
        `/api/products?populate=*&[filters][id]=${id}`
    )
    // console.log(dataitem)

    function handleWishListClick() {
        setIsLiked(!isLiked);
    }


    function handleClick() {
        setCount(count + 1);
    }


    return (
        <div className="product-card" >
            <div className="thumbnail">
                <img src={
                    process.env.REACT_APP_DEV_URL + data.img.data[0].attributes.url
                } alt="" secSet="" onClick={() => navigate("/product/" + id)} />

                {/* Wishlist-button */}
                <button onClick={() => {
                    if (email.length>=1) {
                        handleClick()
                        handleWishListClick()
                        if (count % 2 != 0) {
                            handleAddToWishlist(dataitem)
                        } else {
                            handleRemoveFromWishlist(dataitem?.data?.data?.[0])
                        }
                    }else{
                        window.alert("Please Login!")
                        navigate("/login")
                    }

                }}>
                    {!isLiked ? <AiOutlineHeart /> : <AiTwotoneHeart />}
                </button>

            </div>
            <div className="product-details" onClick={() => navigate("/product/" + id)}>
                <span className="name">
                    {data.title}
                </span>
                <span className="price">&#8377;{data.price}</span>
            </div>
        </div>
    )
};

export default Product;

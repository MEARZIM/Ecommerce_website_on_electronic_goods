import { MdClose } from "react-icons/md"
// import prod from "../../../assets/products/earbuds-prod-1.webp"
import "./WishlistItem.scss";
import { useContext, useState } from "react";
import { Context } from "../../../utils/context"


const WishlistItem = () => {

    const { wishListItems, handleAddToCart, handleRemoveFromWishlist } = useContext(Context)
    const [quantity, setQuantity] = useState(1)
    // console.log(wishListItems)

    return <div className="cart-products">
        {wishListItems?.map((item) => (
            <div
                className="search-result-item"
                key={item.id}
                onClick={() => { }}
            >
                <div className="image-container">
                    <img
                        src={
                            process.env.REACT_APP_DEV_URL + item?.data?.data?.[0].attributes?.img?.data?.[0]?.attributes?.url
                        }
                    />
                </div>
                <div className="prod-details">
                    <span className="name">{item?.data?.data?.[0].attributes?.title }</span>
                    <div className="text">
                        {/* <span>{item.attributes.quantity}</span> */}
                        <span className="highlight">
                            <span>&#8377;</span>
                            {item?.data?.data?.[0]?.attributes?.price}
                        </span>
                    </div>
                </div>
                {/* {console.log(item)} */}
                <div class="buttons">
                    <button class="cart-button" onClick={()=>{
                        handleAddToCart(item?.data?.data?.[0], quantity)
                        setQuantity(1)
                        handleRemoveFromWishlist(item?.data?.data?.[0])
                    }
                    
                }
                        >
                        <span class="add-to-cart">Add to cart</span>
                    </button> </div>
            </div>
        ))}
    </div>;
};

export default WishlistItem;

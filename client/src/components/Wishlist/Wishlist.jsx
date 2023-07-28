import { MdClose } from "react-icons/md"
import { BsCartX } from "react-icons/bs"
import "./Wishlist.scss";
import {Context} from "../../utils/context"
import { useContext } from "react";
import WishlistItem from "./WishlistItems/WishlistItem";

const Wishlist = ({setWishlist}) => {
    const {wishListItems}=useContext(Context);
    // console.log(wishListItems)

    return <div className="cart-panel">cart
        <div className="opac-layer"></div>
        <div className="cart-content">
            <div className="cart-header">
                <span className="heading">Shopping Wishlist</span>
                <span className="close-btn" onClick={()=>setWishlist(false)}>
                    <MdClose />
                    <span className="text">close</span>
                </span>
            </div>

            {!wishListItems?.length &&<div className="empty-cart">
                <BsCartX />
                <span>No product in the WishList</span>
                <button className="return-cta" onClick={()=>setWishlist(false)}>RETURN TO SHOP</button>
            </div>}
            <WishlistItem />

        </div>
    </div>;
};

export default Wishlist;

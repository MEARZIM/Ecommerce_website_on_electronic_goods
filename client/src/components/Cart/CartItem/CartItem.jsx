import { MdClose } from "react-icons/md"
// import prod from "../../../assets/products/earbuds-prod-1.webp"
import "./CartItem.scss";
import { useContext } from "react";
import {Context} from "../../../utils/context"


const CartItem = () => {
    const {cartItems,handleAddToCart,handleRemoveFromCart,handelCartProductQuantity}=useContext(Context)
    
    console.log(cartItems)
    return <div className="cart-products">
        {cartItems?.map((item) => (
                <div
                    className="search-result-item"
                    key={item.id}
                    onClick={() => {}}
                >
                    <div className="image-container">
                        <img
                            src={
                                process.env.REACT_APP_DEV_URL + item?.attributes?.img?.data?.[0]?.attributes?.url
                            }
                        />
                    </div>
                    <div className="prod-details">
                        <span className="name">{item.attributes.title}</span>
                        <MdClose
                            className="close-btn"
                            onClick={() => handleRemoveFromCart(item)}
                        />
                        <div className="quantity-buttons">
                            <span
                                onClick={() =>
                                    handelCartProductQuantity("dec", item)
                                }
                            >
                                -
                            </span>
                            <span>{item.attributes.quantity}</span>
                            <span
                                onClick={() =>
                                    handelCartProductQuantity("inc", item)
                                }
                            >
                                +
                            </span>
                        </div>
                        <div className="text">
                            <span>{item.attributes.quantity}</span>
                            <span>x</span>
                            <span className="highlight">
                                <span>&#8377;</span>
                                {item?.attributes?.price }
                            </span>
                        </div>
                    </div>
                </div>
            ))}
    </div>;
};

export default CartItem;

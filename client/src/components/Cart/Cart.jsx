import { MdClose } from "react-icons/md"
import { BsCartX } from "react-icons/bs"
import CartItem from "./CartItem/CartItem"
import { Context } from "../../utils/context"
import { useContext, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js"
import "./Cart.scss";
import { makePaymentRequest } from "../../utils/api"
import { updateDataFormApi } from "../../utils/api"


const Cart = ({ setShowCart }) => {
    const { authenticateUserId, cartItems, cartSubTotal, email,wishListItems } = useContext(Context)

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

    const handelPayment = async () => {
        try {
            const stripe = await stripePromise;
            const res = await makePaymentRequest.post("/api/orders", {
                products: cartItems,
                email: email,
            });
            await stripe.redirectToCheckout({
                sessionId: res.data.stripeSession.id
            });

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const updatedData = {
            "cardItems" : cartItems,
            "wishListItems" : wishListItems
        };

        if (authenticateUserId > 0) {
            const res = updateDataFormApi(`/api/users/${authenticateUserId}`, updatedData);

            if (res) {
                // window.alert("data acced")
                console.log(res)
            } else {
                // window.alert("Email Already Exists")
                console.log(res)
            }
        }
    }, [cartItems,wishListItems])

    return <div className="cart-panel">cart
        <div className="opac-layer"></div>
        <div className="cart-content">
            <div className="cart-header">
                <span className="heading">Shopping Cart</span>
                <span className="close-btn" onClick={() => setShowCart(false)}>
                    <MdClose />
                    <span className="text">close</span>
                </span>
            </div>

            {!cartItems?.length && <div className="empty-cart">
                <BsCartX />
                <span>No product in the cart</span>
                <button className="return-cta" onClick={() => setShowCart(false)}>RETURN TO SHOP</button>
            </div>}

            <CartItem />
            <div>
                <div className="cart-footer">
                    <div className="subtotal">
                        <span className="text">Subtotal:</span>
                        <span className="text total">&#8377; {cartSubTotal}</span>
                    </div>
                    <div className="button">
                        <button className="check-out" onClick={handelPayment}>Checkout</button>
                    </div>
                </div>
            </div>

        </div>
    </div>;
};

export default Cart;

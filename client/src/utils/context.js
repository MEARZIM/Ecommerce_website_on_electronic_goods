import React,{ createContext, useState, useEffect } from "react"
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai"
import {useLocation} from "react-router-dom"


export const Context = createContext()

const AppContext = (props)=>{
    const [loginLogout, setLoginLogout]= useState("login")
    const [authenticateUserId,setAuthenticateUserId] =useState(0)
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [name, setName]= useState("");
    const [phoneNumber, setphoneNumber]= useState("");
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [cartItems,setCartItems] = useState([]);
    const [wishListItems, setwishListItems] = useState([]);
    const [cartCount,setCartCount] = useState(0);
    const [cartSubTotal,setCartSubTotal] = useState(0);
    const location = useLocation()

    useEffect(()=>{
        window.scrollTo(0,0)
    },[location])

    

    useEffect(()=>{
        let subTotal = 0
        let subCount = 0

        cartItems?.map((item)=>{
            subCount += item?.attributes?.quantity
            setCartCount(subCount)
        })

        cartItems?.map((item)=>{
            subTotal += item?.attributes?.price * item?.attributes?.quantity
            setCartSubTotal(subTotal)
        })

    },[cartItems,cartCount])


    const handleAddToCart = (product, quantity) => {
        let items = [...cartItems];
        let index = items?.findIndex((p) => p.id === product?.id);
        if (index !== -1) {
            items[index].attributes.quantity += quantity;
        } else {
            product.attributes.quantity = quantity;
            items = [...items, product];
        }
        setCartItems(items);
    };
    // console.log(cartItems);

    const handleRemoveFromCart = (product) => {
        let items = [...cartItems];
        items = items?.filter((p) => p.id !== product?.id);
        setCartItems(items);
        setCartSubTotal(0)
        setCartCount(0)
    };

    const handelCartProductQuantity =(type, product)=>{
        let items = [...cartItems];
        let index = items?.findIndex((p) => p.id === product?.id);
        if (type === "inc") {
            items[index].attributes.quantity += 1;
        } else if (type === "dec") {
            if (items[index].attributes.quantity === 1) return;
            items[index].attributes.quantity -= 1;
        }
        setCartItems(items);
    } 

    const handleAddToWishlist = (data) => { 
        let items = [...wishListItems];
        items = [...items, data];
        setwishListItems(items);
    };
    
    const handleRemoveFromWishlist = (data) => {
        let items = [...wishListItems];
        items = items?.filter((p) =>p?.data?.data?.[0]?.id !== data?.id);
        setwishListItems(items);
    };
    
    
    const contextValue = {
        loginLogout, 
        setLoginLogout,
        authenticateUserId,
        setAuthenticateUserId,
        email,
        setEmail,
        password,
        setPassword,
        phoneNumber,
        setphoneNumber,
        name, 
        setName,
        products,
        setProducts,
        categories,
        setCategories,
        cartItems,
        setCartItems,
        cartCount,
        setCartCount,
        cartSubTotal,
        setCartSubTotal,
        wishListItems,
        setwishListItems,
        handleAddToCart,
        handleRemoveFromCart,
        handelCartProductQuantity,
        handleAddToWishlist,
        handleRemoveFromWishlist,
      };

      return(
          <Context.Provider
            value={contextValue}
        >
            {props.children}
        </Context.Provider>
    )
}
export default AppContext
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TbSearch } from "react-icons/tb"
import {CgProfile} from "react-icons/cg"
import { CgShoppingCart } from "react-icons/cg"
import { AiOutlineHeart } from "react-icons/ai"
import Search from "./Search/Search"
import Cart from "../Cart/Cart"
import {Context} from "../../utils/context";
import "./Header.scss";
import Wishlist from "../Wishlist/Wishlist";



const Header = () => {
    const navigate=useNavigate()
    const [scrolled, setScrolled]= useState(false)
    const [showCart, setShowCart]= useState(false)
    const [wishlist, setWishlist]= useState(false)
    const [showSearch, setShowSearch]= useState(false)
    const {cartCount}=useContext(Context)

    const handleScroll = ()=>{
        const offset = window.scrollY;
        if (offset > 50){
            //console.log(scrolled)
            setScrolled(true)
        }else{
            setScrolled(false)
        }
    }
    useEffect(()=>{
        window.addEventListener("scroll", handleScroll)
    }, [])


    return (
    <div>
        <header className={`main-header ${scrolled ? "sticky-header": ""}`}>
            <div className="header-content">
                <ul className="left">
                    <li onClick={()=>navigate("/")} >Home</li>
                    <li onClick={()=>navigate("/about_us")}>About</li>
                    <li onClick={()=>{window.scroll(0,550)}}>Categories</li>
                </ul>
                <div className="center" >Pixel Gadgets</div>
                <div className="right">
                    <CgProfile onClick={()=>{navigate("/login")}} />
                    <TbSearch  onClick={()=> setShowSearch(true)} />
                    <AiOutlineHeart onClick={()=> setWishlist(true)} />
                    <span className="cart-icon" onClick={()=> setShowCart(true)}>
                        <CgShoppingCart/>
                        <span>{cartCount}</span>
                    </span>
                </div>
            </div>
        </header>
        {showCart && <Cart setShowCart={setShowCart} />}
        {showSearch && <Search setShowSearch={setShowSearch} />}
        {wishlist && <Wishlist setWishlist={setWishlist}/>}
    </div>
    )
        
}

export default Header;

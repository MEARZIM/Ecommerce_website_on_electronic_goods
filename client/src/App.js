import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home"
import Category from "./components/Category/Category"
import SingleProduct from "./components/SingleProduct/SingleProduct"
import Newsletter from "./components/Footer/Newsletter/Newsletter"
import CheckOut from "./components/CheckOut/CheckOut"
import Login from "./components/login-register/login/login"
import Register from "./components/login-register/register/register"
import Return from './components/Return/Return'
import AboutUS from "./components/About/AboutUs"
import AppContext from "./utils/context"

function App() {
    return(
        <BrowserRouter>
            <AppContext>
                <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about_us" element={<AboutUS />}/>
                        <Route path="/category/:id" element={<Category />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/product/:id" element={<SingleProduct />} />
                        <Route path="/success" element={<CheckOut/>} />
                        <Route path="/return" element={<Return/>} />
                    </Routes>
                <Newsletter />
                <Footer />
            </AppContext>
        </BrowserRouter>
    );
}

export default App;

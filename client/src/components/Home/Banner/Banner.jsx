import "./Banner.scss";
import BannerIMG from "../../../assets/banner-img.png"
const Banner = () => {
    return <div>
        <div className="hero-banner">
            <div className="content">
                <div className="text-content">
                    <h1>Sales</h1>
                    <p>
                    Welcome to our online store, your ultimate destination for all things 
                    fabulous and convenient. Step into a world of style. 
                    Start exploring now and let us help you discover the perfect products that will 
                    elevate your lifestyle.
                    </p>
                    <div className="ctas">
                        <div className="banner-cta">Read more</div>
                        <div className="banner-cta v2">Shop Now</div>
                    </div>
                </div>
                <img className="banner-img" src={BannerIMG} alt="" />
            </div>
        </div>
    </div>;
};

export default Banner;

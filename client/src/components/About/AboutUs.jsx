import "./AboutUs.css"
import Avishikta from "../../assets/About/Avishikta.jpg"

const AboutUs = () => {
    return (
        <div className="component">
            <div class="responsive-container-block bigContainer">
                <div class="responsive-container-block Container bottomContainer">
                    <div class="allText bottomText">
                        <p class="text-blk headingText">
                            About Our
                        </p>
                        <p class="text-blk subHeadingText">
                            Website      
                        </p>
                        <p class="text-blk description">
                        This e-commerce website specializing in electronics goods offers a convenient and diverse platform for tech-savvy consumers to explore, compare, and purchase a wide range of electronic devices and accessories. From cutting-edge smartphones and sleek laptops to immersive home entertainment 
                        systems and innovative smart home gadgets, this platform is a haven for technology enthusiasts.
                        </p>
                        <p class="text-blk description">
                        The website boasts a user-friendly interface, allowing visitors to effortlessly navigate through various product categories and filter options to find their desired electronics. Detailed product descriptions, high-resolution images, and customer reviews provide valuable insights and help potential buyers make informed decisions. 
                        The extensive product inventory showcases offerings from renowned brands, ensuring quality and reliability.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;
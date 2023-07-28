import "./Products.scss";
import Product from "./Product/Product"
const Products = ({products,innerPage, headingText}) => {
    // const totalProduct=8
    // const productList =[]
    // for (let index = 0; index < totalProduct; index++) {
    //     productList.push(<Product />)
    // }

    return (
        <div className="product-container">
            {!innerPage && <div className="sec-heading">{headingText}</div>}
            <div className="product">
                {products?.data?.map((item)=>(
                    <Product key={item.id} id={item.id} data={item.attributes} />
                ))}
            </div>
        </div>
    )
};

export default Products;

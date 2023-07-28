import useFetch from "../../../hooks/useFetch";
import Product from "../../Products/Products"

const RelatedProducts = ({productid,categoryid}) => {
    const {data} = useFetch (
        `/api/products?populate=*&[filters][id][$ne]=${productid}&[filters][categories][id]=${categoryid}&pagination[start]=0&pagination[limit]=4`
    )


    return <div className="related-product">
        <Product headingText="Related Product" products={data}/>
    </div>;
};

export default RelatedProducts;

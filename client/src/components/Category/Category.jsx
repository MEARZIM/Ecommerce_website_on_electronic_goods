import "./Category.scss";
import Product from "../Products/Products"
import {useParams} from "react-router-dom"
import useFetch from "../../hooks/useFetch";

const Category = () => {
    const {id} = useParams()
    const {data} =useFetch(
        `/api/products?populate=*&[filters][categories][id]=${id}`
        )
        //  console.log({data})

    

    return <div className="category-main-content">
        <div className="layout">
            <div className="category-title">
                {data?.data?.[0]?.attributes?.categories?.data?.[0]?.attributes?.title}
            </div>
            <Product innerPage={true} products={data} />
        </div>
    </div>;
};

export default Category;

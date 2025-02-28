import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import Title from "./Title";

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext); // ✅ Correct context usage
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products.filter(
        (item) => item.category === category && item.subCategory === subCategory
      );
      setRelated(filteredProducts.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols4 lg:grid-cols-5 gap-4 gap-y6'>
            {related.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
            ))}
        </div>
    </div>

    
  );
};

export default RelatedProduct;

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from "../components/RelatedProduct"; // Ensure correct import

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    if (products.length > 0) {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
      }
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} 
                     className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-lg' alt="product" />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto rounded-lg' src={image} alt="Selected Product" />
          </div>
        </div>

        {/* Product Information */}
        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              {[...Array(4)].map((_, i) => (
                <img key={i} src={assets.star_icon} alt="star" className="w-3.5" />
              ))}
              <img src={assets.star_dull_icon} alt="star" className="w-3.5" />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item, index) => (
                  <button key={index} onClick={() => setSize(item)} 
                          className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-blue-400' : ''} rounded`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => addToCart(productData._id, size)} 
                    className='bg-gray-800 text-white px-8 py-3 text-sm active:bg-gray-700 rounded-lg'>
              ADD TO CART
            </button>
            <hr className='mt-8 sm:w-4/5' />
            <div className='text-small text-gray-500 flex flex-col gap-1 mt-4'>
              <p>100% Original product</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Discover the perfect blend of comfort and fashion with our product. Made from high-quality fabric, this piece offers a soft, breathable feel while ensuring durability for everyday wear.</p>
          <p>Upgrade your wardrobe with our product, designed for those who appreciate both style and comfort.</p>
        </div>
      </div>

      {/* Display Related Products */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
}

export default Product;

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products , search , showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType , setSorttype]=useState('relavent');

  // ✅ Toggle Category Selection
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  // ✅ Toggle SubCategory Selection
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  // ✅ Apply Filter Logic
  const applyFilter = () => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProduct(productsCopy);
  };

  const sortProduct =() =>{
       let fpCopy =filterProduct.slice();

       switch(sortType){
        case 'low-high':
        setFilterProduct(fpCopy.sort((a,b)=>a.price-b.price));
        break;

        case 'high-low':
        setFilterProduct(fpCopy.sort((a,b)=>b.price-a.price));
        break;
      
        default:
          applyFilter();
          break;
        }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory , search , showSearch]);

  useEffect(() => {
   sortProduct();
  }, [sortType]);



  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

    {/* -----------Leftside - Filter options--------------- */}
    <div className='min-w-60'>
      <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
        <img className={`h-3 sm:hidden ${showFilter? 'rotate-90':''}`} src={assets.dropdown_icon} alt=''/>
      </p>

      {/* Category Filter */}
      <div className={`border border-gray-300 pl-5 py-3 mt-6 rounded-lg ${showFilter? '' : 'hidden'} sm:block`}>
        <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'> 
          <p className='flex gap-2'>
            <input  className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory}/>Men
          </p>
          <p className='flex gap-2'>
            <input  className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory}/>Women
          </p>
          <p className='flex gap-2'>
            <input  className='w-3' type='checkbox' value={'Kids'} onChange={toggleCategory}/>Kids
          </p>
        </div>
      </div>

        {/* Subcategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 rounded-lg ${showFilter? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'> 
            <p className='flex gap-2'>
              <input  className='w-3' type='checkbox' value={'Topwear'} onChange={toggleSubCategory}/>Topwear
            </p>
            <p className='flex gap-2'>
              <input  className='w-3' type='checkbox' value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
            </p>
            <p className='flex gap-2'>
              <input  className='w-3' type='checkbox' value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Product Display */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          {/* Product sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 rounded'>
            <option value="relavent">Sort by : Relavent</option>
            <option value="low-high">Sort by : Low-High</option>
            <option value="high-low">Sort by : High-Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProduct.length > 0 ? 
              filterProduct.map((item, index) => (
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
              ))
            : <p className="text-gray-600">No products found</p>
          }
        </div>
      </div>
    </div>
  );
};

export default Collection;

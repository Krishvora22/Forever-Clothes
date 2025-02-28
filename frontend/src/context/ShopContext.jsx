import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const[search , setSearch]=useState('');
  const[showSearch , setShowSearch]=useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate=useNavigate();

  const addToCart = async (ItemId, size) => {

    if(!size){
      toast.error('select product size');
      return;
  }

    let cartData = structuredClone(cartItems); // Clone the cart state
  
    if (cartData[ItemId]) {
      if (cartData[ItemId][size]) {
        cartData[ItemId][size] += 1; // Increase quantity if item & size exist
      } else {
        cartData[ItemId][size] = 1; // Initialize size if not present
      }
    } else {
      cartData[ItemId] = { [size]: 1 }; // Initialize item and size
    }
  
    setCartItems(cartData); // Update state
  };
  
  const getCartCount=()=>{
    let totalCount=0;
    for(let items in cartItems){
       for(let item in cartItems[items]){
           try{
              if(cartItems[items][item]>0){
                totalCount+=cartItems[items][item];
              }
           } catch(error){
              
           }
       }
    }
    return totalCount;
  }
  
    const updateQuantity=async(ItemId , size , quantity) =>{
       let cartData = structuredClone(cartItems); // Clone the cart state
      
       cartData[ItemId][size]=quantity;
      setCartItems(cartData);

    }

    const getCartAmount = () => {
      let totalAmount = 0;
    
      for (const items in cartItems) {
        let itemInfo = products.find((product) => product._id === items);
    
        // Ensure itemInfo exists before accessing its properties
        if (!itemInfo) continue;
    
        for (const item in cartItems[items]) {
          try {
            if (cartItems[items][item] > 0) {
              totalAmount += itemInfo.price * cartItems[items][item];
            }
          } catch (error) {
            console.error("Error calculating total amount:", error);
          }
        }
      }
    
      return totalAmount; // Moved outside the loop
    };
    
  const value = { 
    products, currency, delivery_fee ,
    search , setSearch ,showSearch , setShowSearch ,
    cartItems , setCartItems , addToCart , 
    getCartCount , updateQuantity,
    getCartAmount , navigate
  }; // Fixed typo in 'value'

  return (
    <ShopContext.Provider value={value}>
      {props.children} {/* Fixed 'children' spelling */}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

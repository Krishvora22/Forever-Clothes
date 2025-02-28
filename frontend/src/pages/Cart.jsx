import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            quantity: cartItems[itemId][size],
            size: size,
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <motion.div 
      className="border-t pt-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          return (
            <motion.div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1fr_0.5fr] sm:grid-cols-[4fr_1fr_0.5fr] items-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* Product Details */}
              <div className="flex items-start gap-5">
                <motion.img 
                  className="w-16 sm:w-20 rounded-lg shadow-md"
                  src={productData.image[0]} 
                  alt={productData.name}
                  whileHover={{ scale: 1.1 }}
                />
                <div>
                  <p className="text-sm sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="text-lg font-semibold">{currency}{productData.price}</p>
                    <p className="px-3 py-1 border bg-slate-50 rounded-md">{item.size}</p>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <motion.input
                onChange={(e) =>
                  e.target.value === " " || e.target.value === "0"
                    ? null
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                }
                className="border max-w-14 sm:max-w-20 px-2 py-1 text-center rounded-md shadow-sm"
                type="number"
                min={1}
                defaultValue={item.quantity}
                whileFocus={{ scale: 1.1, borderColor: "#000" }}
              />

              {/* Delete Button */}
              <motion.img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-5 cursor-pointer hover:scale-110 transition-transform duration-200"
                src={assets.bin_icon}
                alt="Delete"
                whileTap={{ scale: 0.8 }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Cart Total & Checkout */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <motion.button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3 rounded-lg shadow-md transition-all hover:bg-gray-800 active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              PROCEED TO CHECKOUT
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;

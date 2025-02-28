import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount() || 0;
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [isValidCode, setIsValidCode] = useState(false);

  const validPromoCodes = {
    "SAVE10": 10,   // 10% discount
    "FREESHIP": delivery_fee,  // Free shipping
  };

  useEffect(() => {
    setDiscount(validPromoCodes[promoCode.toUpperCase()] || 0);
    setIsValidCode(promoCode.toUpperCase() in validPromoCodes);
  }, [promoCode]);

  const total = subtotal - discount + (isValidCode && promoCode === "FREESHIP" ? 0 : delivery_fee);

  return (
    <div className="w-full bg-white/70 backdrop-blur-lg shadow-xl border border-gray-200 rounded-2xl px-6 py-5 transition-all hover:shadow-2xl">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="flex flex-col gap-3 mt-4 text-sm text-gray-700">
        <div className="flex justify-between items-center">
          <p className="font-medium">Subtotal</p>
          <p className="font-semibold">{currency} {subtotal.toFixed(2)}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-medium">Discount</p>
          <p className={`font-semibold ${discount > 0 ? 'text-green-500' : 'text-gray-500'}`}>
            {discount > 0 ? `- ${currency} ${discount.toFixed(2)}` : 'None'}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-medium">Shipping Fee</p>
          <p className={`font-semibold ${isValidCode && promoCode === "FREESHIP" ? 'text-green-500' : 'text-black'}`}>
            {isValidCode && promoCode === "FREESHIP" ? 'Free' : `${currency} ${delivery_fee.toFixed(2)}`}
          </p>
        </div>
        
        <hr className="border-gray-300" />
        <div className="flex justify-between items-center text-lg font-bold">
          <p>Total</p>
          <p className="text-black">{currency} {total.toFixed(2)}</p>
        </div>

        {/* Promo Code Input */}
        <div className="mt-4 flex gap-2">
          <input 
            type="text" 
            placeholder="Enter promo code" 
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:ring-2 focus:ring-blue-400"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => setPromoCode(promoCode.toUpperCase())}
          >
            Apply
          </button>
        </div>

        {isValidCode && <p className="text-green-500 text-xs mt-1">✅ Code Applied: {promoCode}</p>}
        {promoCode && !isValidCode && <p className="text-red-500 text-xs mt-1">❌ Invalid Code</p>}
      </div>
    </div>
  );
};

export default CartTotal;

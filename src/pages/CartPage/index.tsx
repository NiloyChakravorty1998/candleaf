import { useNavigate } from "react-router-dom";
import ProductRow from "./ProductRow";
import { useState, useEffect } from "react";
import { useGetCartQuery } from "../../storew/RTKQuery/cartAPISlice";

const CartPage = () => {
  const {data: cart} = useGetCartQuery();
  const [subTotal, setSubTotal] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (cart && cart.length > 0) {
      const sT = cart.map((item) => item.product.totalPrice).reduce((prev, curr) => prev + curr, 0);
      setSubTotal(sT);
    } else {
      setSubTotal(0);
    }
  }, [cart]); 

  return (
    <div className="px-[140px] flex-col items-center justify-center mt-4">
      <div className="text-center mb-8">
        <ul>
          <li>
            <h1 className="text-3xl">Your cart items</h1>
          </li>
          <li>
            <h1
              className="text-lg hover:cursor-pointer underline underline-offset-2 text-[#56B280] hover:text-green-600"
              onClick={() => navigate('/')}
            >
              Back to shopping
            </h1>
          </li>
        </ul>
      </div>

      {/* Render cart items */}
      {cart && cart.length > 0 ? (
        cart.map((item) => (
          <ProductRow
            key={item.id}
            id={item.id}
            price={item.product.price}
            imageUrl={item.product.imageUrl}
            name={item.product.name}
            quantity={item.product.quantity}
            totalPrice={item.product.totalPrice}
          />
        ))
      ) : (
        <p>Your cart is empty</p> // Show message if cart is empty
      )}

      {/* Display subtotal and checkout button */}
      <div className="flex items-center gap-4 text-xl justify-center my-10">
        <h1>Sub-total</h1>
        <h1>{subTotal}$</h1>
        <button className="bg-[#56B280] px-10 rounded-3xl py-3 text-white hover:bg-green-800">
          Check-out
        </button>
      </div>
    </div>
  );
};

export default CartPage;

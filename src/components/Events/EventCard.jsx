import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data = {} }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (item) => {
    if (!item || !item._id) return;

    const isItemExists = cart?.find((i) => i._id === item._id);

    if (isItemExists) {
      toast.error("Item already in cart!");
      return;
    }

    if (item.stock < 1) {
      toast.error("Product stock limited!");
      return;
    }

    const cartData = { ...item, qty: 1 };
    dispatch(addTocart(cartData));
    toast.success("Item added to cart successfully!");
  };

  // 🛑 Agar data hi na ho to card render na karo
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src={data?.images?.[0]?.url || "/placeholder.png"}
          alt={data?.name || "product"}
        />
      </div>

      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>
          {data?.name || "No name"}
        </h2>

        <p>{data?.description || "No description"}</p>

        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data?.originalPrice || 0}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data?.discountPrice || 0}$
            </h5>
          </div>

          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data?.sold_out || 0} sold
          </span>
        </div>

        <CountDown data={data} />
        <br />

        <div className="flex items-center">
          <Link to={`/product/${data?._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>

          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

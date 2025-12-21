
import React from "react";
import styles from "../../styles/styles";

const CheckoutSteps = ({ active }) => {
  return (
    <div className="w-full flex justify-center mt-10">
      <div className="flex items-center gap-8">

   
        <div className={styles.cart_button}>
          <span className={styles.cart_button_text}>1. Shipping</span>
        </div>

        {/* Line between step 1 → 2 */}
        <div
          className={`w-[80px] h-[3px] rounded-full transition-all duration-300 ${
            active > 1 ? "bg-[#f63b60]" : "bg-[#ffe3e9]"
          }`}
        />

      
        <div
          className={`${
            active > 1
              ? styles.cart_button
              : `${styles.cart_button} !bg-[#ffe3e9]`
          }`}
        >
          <span
            className={`${
              active > 1
                ? styles.cart_button_text
                : `${styles.cart_button_text} !text-[#f63b60]`
            }`}
          >
            2. Payment
          </span>
        </div>

        {/* Line between step 2 → 3 */}
        <div
          className={`w-[80px] h-[3px] rounded-full transition-all duration-300 ${
            active > 2 ? "bg-[#f63b60]" : "bg-[#ffe3e9]"
          }`}
        />


        <div
          className={`${
            active > 2
              ? styles.cart_button
              : `${styles.cart_button} !bg-[#ffe3e9]`
          }`}
        >
          <span
            className={`${
              active > 2
                ? styles.cart_button_text
                : `${styles.cart_button_text} !text-[#f63b60]`
            }`}
          >
            3. Success
          </span>
        </div>

      </div>
    </div>
  );
};

export default CheckoutSteps;

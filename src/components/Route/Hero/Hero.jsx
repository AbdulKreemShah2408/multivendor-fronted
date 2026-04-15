import React from "react";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat bg-cover bg-center flex items-center ${styles.normalFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1 className="text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize">
          Best Collection For <br /> Home Decoration
        </h1>

        <p className="pt-5 text-[16px] font-poppins font-normal text-[#000000ba] max-w-[600px] leading-[1.8]">
         Discover our curated selection of premium home accessories and furniture. From minimalist designs to timeless classics, find everything you need to transform your house into a beautiful home.
        </p>

        <Link to="/products" className="inline-block">
          <div className={`${styles.button}`}>
            <span className="text-[#fff] font-[Poppins] font-[400] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Hero;

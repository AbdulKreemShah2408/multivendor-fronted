import React, { useState, useEffect } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { productData, categoriesData } from "../../static/data";
import Cart from "../Cart/Cart";
import Wishlist from "../wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";

function Header({ activeHeading }) {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const {cart}=useSelector((state)=>state.cart)
  const {wishlist}=useSelector((state)=>state.wishlist);
  const {allProducts}=useSelector((state)=>state.products)
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const isSeller = false;

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchData([]);
      return;
    }

    const filtered = allProducts.filter(
      (product) =>
        product.name && product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filtered);
  };

  return (
    <>
      {/* ---- Top Header ---- */}
      <div className={`${styles.section}`}>
        <div className="h-[70px] my-[15px] flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img
              className="h-[38px] rounded-lg hover:scale-110 transition-transform duration-200 mt-3"
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt="Logo"
            />
          </Link>

          {/* Search bar */}
          <div className="w-[55%] relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full h-[45px] px-5 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
            />
            <AiOutlineSearch
              size={22}
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer hover:text-indigo-600 transition"
            />

            {searchData.length > 0 && (
              <div className="absolute top-[50px] left-0 w-full max-h-[55vh] overflow-y-auto bg-white rounded-lg shadow-xl z-[9] p-3">
                {searchData.map((item, index) => (
                  <Link to={`/product/${item._id}`} key={index}>
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md transition">
                      <img
                        src={item.images?.[0]?.url}
                        alt={item.name}
                        className="h-[42px] w-[42px] object-cover rounded"
                      />
                      <h1 className="text-sm font-medium text-gray-700">
                        {item.name}
                      </h1>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Seller Button */}
          <div className="ml-3">
            <Link
              to={isSeller ? "/dashboard" : "/shop-create"}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-md transition"
            >
              {isSeller ? (
                <>
                  <MdDashboard size={20} /> <span>Dashboard</span>
                </>
              ) : (
                <>
                  <FiShoppingBag size={20} /> <span>Become Seller</span>
                </>
              )}
              <IoIosArrowForward size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* ---- Navbar Section ---- */}
      <div
        className={`${
          active
            ? "shadow-sm fixed top-0 left-0 z-20 bg-[#3321c8]"
            : "bg-[#3321c8]"
        } hidden 800px:flex items-center justify-between w-full h-[70px] transition-all duration-300`}
      >
        <div className={`${styles.section} flex items-center justify-between`}>
          {/* Categories Dropdown */}
          <div className="relative w-[270px] hidden 1000px:block">
            <button
              onClick={() => setDropDown(!dropDown)}
              className="w-full h-[60px] mt-[5px] pl-10 flex justify-between items-center bg-white text-lg font-[500] rounded-t-md"
            >
              <div className="flex items-center gap-2">
                <BiMenuAltLeft size={26} />
                All Categories
              </div>
              <IoIosArrowDown
                size={20}
                className={`mr-3 transition-transform ${
                  dropDown ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropDown && (
              <DropDown
                categoriesData={categoriesData}
                setDropDown={setDropDown}
              />
            )}
          </div>

          {/* Navbar Items */}
          <div className="flex-1 mx-6">
            <Navbar active={activeHeading} />
          </div>

          {/* Wishlist + Cart + Profile */}
          <div className="flex items-center justify-end gap-6">
            {/* Wishlist */}
            <div
              className="relative cursor-pointer"
              onClick={() => setOpenWishlist(true)}
            >
              <AiOutlineHeart size={30} className="text-white opacity-90" />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] text-center leading-tight">
                {wishlist && wishlist.length}
              </span>
            </div>

            {/* Cart */}
            <div
              className="relative cursor-pointer"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart
                size={30}
                className="text-white opacity-90"
              />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] text-center leading-tight">
                {cart && cart.length}
              </span>
            </div>

            {/* Updated Profile Section */}
            <div className="cursor-pointer">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={user?.avatar?.url}
                    alt="Profile"
                    className="h-[38px] w-[38px] rounded-full border-2 border-white object-cover hover:scale-105 transition"
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile
                    size={30}
                    className="text-white opacity-90 hover:text-gray-200 transition"
                  />
                </Link>
              )}
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>
      </div>
      {/* Mobile Header */}
      <div
        className={`${
          active
            ? "shadow-sm fixed top-0 left-0 z-20 bg-[#3321c8]"
            : "bg-[#3321c8]"
        } w-full h-[60px] fixed bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden `}
      >
        <div className="w-full flex items-center justify-between ">
          <div>
            <BiMenuAltLeft
              size={25}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                className="h-[38px] rounded-lg hover:scale-110 transition-transform duration-200 mt-3"
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="Logo"
              />
            </Link>
          </div>
          <div>
            <div className="relative mr-[20px]">
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] text-center leading-tight">
                {cart && cart.length}
              </span>
            </div>
          </div>
        </div>
        {/*header sidebar*/}
        {open && (
          <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0 ">
            <div className="fixed w-[60%] bg-[#fff] h-screen overflow-y-auto top-0 left-0 z-10">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-[15px]">
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white font-mono text-[12px] text-center leading-tight">
                      0
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="mt-5 ml-3"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="my-8 w-[92%] m-auto h-[40px] relative">
                <input
                  type="search"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full h-[45px] px-5 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                />
                {searchData.length > 0 && (
                  <div className="absolute top-[50px] left-0 w-full max-h-[55vh] overflow-y-auto bg-white rounded-lg shadow-xl z-[9] p-3">
                    {searchData.map((item, index) => (
                      <Link to={`/product/${item.name}`} key={index}>
                        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md transition">
                          <img
                            src={item.image_Url?.[0]?.url}
                            alt={item.name}
                            className="h-[42px] w-[42px] object-cover rounded"
                          />
                          <h1 className="text-sm font-medium text-gray-700">
                            {item.name}
                          </h1>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />
              <div className="flex w-full justify-center">
                {
                  isAuthenticated ? (
                   <div>
                    <Link to="/profile">
                     <img
                    src={user?.avatar?.url}
                    alt="Profile"
                    className="h-[60px] w-[60px] rounded-full  object-cover hover:scale-105 transition border-[3px] border-[#0eae88]"

                  />
                    </Link>
                   </div>
                  ):(
                    
                   <>
                    <Link
                  to="/login"
                  className="text-[18px] pr-[10px] text-[#000000b7]"
                >
                  Login/
                </Link>
                <Link to="/sign-up" className="text-[18px]  text-[#000000b7]">
                  SignUp
                </Link>
                    </>
                  )
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;

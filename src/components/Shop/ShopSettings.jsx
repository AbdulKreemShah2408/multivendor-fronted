import React, { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import { server } from "../../server";
import { loadSeller } from "../../redux/actions/user";
import axios from "axios";
const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar,setAvatar]=useState();
  const [name,setName]=useState(seller && seller.name);
  const [description,setDescription]=useState(seller && seller.description ? seller.description :"");
  const [address,setAddress]=useState(seller && seller.adddress);
  const [phoneNumber,setPhoneNumber]=useState(seller && seller.phoneNumber);
  const [zipCode,setZipCode]=useState(seller && seller.zipCode);
  const dispatch=useDispatch();
const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/shop/update-shop-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            dispatch(loadSeller());
            toast.success("avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };


  const updateHandler=async(e)=>{
    e.preventDefault();
    await axios.put(`${server}/shop/update-seller-info`,{
      name,description,address,zipCode,phoneNumber,
    },{withCredentials:true}).then((res)=>{
      toast.success("Shop info updated successfully");
      dispatch(loadSeller())
    }).catch((error)=>{
      toast.error(error.response.data.message);
    })
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={avatar ? avatar : `${seller.avatar?.url}`}
              alt="Shop avatar"
              className="w-[200px] h-[200px] rounded-full cursor-pointer object-cover"
            />
            <div
              className="w-9 h-9 bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer 
                          absolute bottom-[10px] right-[15px]
                          hover:bg-green-500 hover:text-white transition-colors"
              title="Change Profile Picture"
            >
              <input
                type="file"
                id="image"
                className="hidden"
                accept="image/*"
                onChange={handleImage}
              />
              <label htmlFor="image" className="cursor-pointer">
                <AiOutlineCamera size={20} />
              </label>
            </div>
          </div>
        </div>
        {/* shop info */}
        <form aria-required={true} className="flex flex-col items-center" onSubmit={updateHandler}>
          <div className="w-[100%] 800px:w-[50%]">
            <label className="block pb-2">Shop Name</label>
            <input
              type="name"
              placeholder={`${seller.name}`}
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] 800px:w-[50%]">
            <label className="block pb-2">Shop description</label>
            <input
              type="name"
              placeholder={`${
                seller?.description
                  ? seller.description
                  : "Enter your shop description"
              }`}
              value={description}
               onChange={(e)=>setDescription(e.target.value)}
              className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
              
            />
          </div>
          <div className="w-[100%] 800px:w-[50%]">
            <label className="block pb-2">Shop Address</label>
            <input
              type="name"
              placeholder={seller?.address}
              value={address}
               onChange={(e)=>setAddress(e.target.value)}

              className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] 800px:w-[50%]">
            <label className="block pb-2">Shop Phone Number</label>
            <input
              type="number"
              placeholder={seller?.phoneNumber}
              value={phoneNumber}
               onChange={(e)=>setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] 800px:w-[50%]">
            <label className="block pb-2">Shop Zip Code</label>
            <input
              type="number"
              placeholder={seller?.zipCode}
              value={zipCode}
               onChange={(e)=>setZipCode(e.target.value)}
              className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] 800px:w-[50%]">
            <input
              type="submit"
              value="Update shop"
              className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
              required
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;

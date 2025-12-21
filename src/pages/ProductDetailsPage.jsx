import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductDetails from "../components/Products/ProductDetails";

import SuggestedProduct from '../components/Products/SuggestedProduct';
import { useSelector } from 'react-redux';
function ProductDetailsPage() {
  const {allProducts}=useSelector((state)=>state.products);
  const {allEvents}=useSelector((state)=>state.events);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams]=useSearchParams();
  const eventData=searchParams.get("isEvent");

 useEffect(() => {
  if(eventData !==null){
   if (allEvents && allEvents.length > 0) {
    const data= allEvents.find((i) => i._id === id);
    setData(data);
  }
  }
  else{
    if (allProducts && allProducts.length > 0) {
    const data = allProducts.find((i) => i._id === id);
    setData(data);
  }
  }
  
}, [allProducts, data,allEvents]);


  return (
    <div>
      <Header />
      <ProductDetails data={data} />
       {
        !eventData && (
         <>
           {
        data && <SuggestedProduct data={data} />
      }
         </>
        )
       }
      <Footer />
    </div>
  );
}

export default ProductDetailsPage;

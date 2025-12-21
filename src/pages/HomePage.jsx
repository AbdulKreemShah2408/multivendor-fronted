import React, { useEffect } from "react";
import Header from "../components/layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeatureProduct from "../components/Route/FeaturedProduct/FeaturedProduct ";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/layout/Footer";


function HomePage() {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeatureProduct />
      <Sponsored />
      <Footer />
    </div>
  );
}

export default HomePage;

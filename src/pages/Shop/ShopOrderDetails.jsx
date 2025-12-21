import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import Footer from '../../components/layout/Footer'
import OrderDetails from '../../components/Shop/OrderDetails'

const ShopOrderDetails = () => {
  return (
    <div>
      <DashboardHeader />
      <OrderDetails/>
      <Footer/>
    </div>
  )
}

export default ShopOrderDetails
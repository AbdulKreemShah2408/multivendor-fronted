import {createReducer} from "@reduxjs/toolkit"


const initialState={
    isLoading:true,
    orders:[],
}


export const orderReducer=createReducer(initialState,(builder)=>{
    builder
   

    // get all orders of user
    .addCase("GetAllOrdersUserRequest",(state)=>{
        state.isLoading=true;
    })
    .addCase("GetAllOrdersUserSuccess",(state,action)=>{
        state.isLoading=false;
        state.orders=action.payload;
    })
    .addCase("GetAllOrdersUserFail",(state,action)=>{
        state.isLoading=false;
        state.error=action.payload;
    })
   // get all orders of a seller
   .addCase("GetAllOrdersShopRequest",(state)=>{
        state.isLoading=true;
    })
    .addCase("GetAllOrdersShopSuccess",(state,action)=>{
        state.isLoading=false;
        state.orders=action.payload;
    })
    .addCase("GetAllOrdersShopFail",(state,action)=>{
        state.isLoading=false;
        state.error=action.payload;
    })
    .addCase("ClearErrors",(state)=>{
        state.error=null;
    })

})
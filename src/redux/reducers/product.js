import {createReducer} from "@reduxjs/toolkit"


const initialState={
    isLoading:true,
    products:[],
}


export const productReducer=createReducer(initialState,(builder)=>{
    builder
    .addCase("ProductCreateRequest",(state)=>{
     state.isLoading=true;
    })
    .addCase("ProductCreateSuccess",(state,action)=>{
        state.isLoading=false;
        state.products=action.payload;
        state.success=true;
    })
    .addCase("ProductCreateFail",(state,action)=>{
        state.isLoading=false;
        state.error=action.payload;
        state.success=false;
    })

    // get all products of shop
    .addCase("GetAllProductsShopRequest",(state)=>{
        state.isLoading=true;
    })
    .addCase("GetAllProductsShopSuccess",(state,action)=>{
        state.isLoading=false;
        state.products=action.payload;
    })
    .addCase("GetAllProductsShopFail",(state,action)=>{
        state.isLoading=false;
        state.error=action.payload;
    })
    // delete a product of a shop
    .addCase("DeleteProductRequest",(state)=>{
        state.isLoading=true;
    })
    .addCase("DeleteProductSuccess",(state,action)=>{
        state.isLoading=false;
        state.message=action.payload;
    })
    .addCase("DeleteProductFail",(state,action)=>{
        state.isLoading=false;
        state.error=action.payload;
    })
    // get all of a products of a shop
    .addCase("GetAllProductsRequest", (state) => {
  state.isLoading = true;
})
.addCase("GetAllProductsSuccess", (state, action) => {
  state.isLoading = false;
  state.allProducts = action.payload;
})
.addCase("GetAllProductsFail", (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})

    .addCase("ClearErrors",(state)=>{
        state.error=null;
    })

})
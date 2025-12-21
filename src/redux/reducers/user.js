// import { createReducer } from "@reduxjs/toolkit";


// const initialState={
// isAuthenticated:false,
// }


// export const userReducer=createReducer(initialState,{
//     loadUserRequest:(state)=>{
//         state.loading=true;
//     },
//     loadUserSuccess:(state,action)=>{
//         state.isAuthenticated=true;
//         state.loading=false;
//         state.user=action.payload;
//     },
//     loadUserFail:(state,action)=>{
//         state.loading=false;
//         state.error=action.payload;
//         state.isAuthenticated=false;
//     },
//     clearErrors:(state)=>{
//         state.error=null;
//     },
// })
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    // update a user information
    .addCase("UpdateUserInfoRequest",(state)=>{
      state.loading=true;
    })
    .addCase("UpdateUserInfoSuccess",(state,action)=>{
      state.loading=false;
      state.user=action.payload;
    })
    .addCase("UpdateUserInfoFail",(state)=>{
      state.loading=false;
      state.error=action.payload;
    })
    // update a user address
    .addCase("UpdateUserAddressRequest",(state)=>{
      state.addressloading=true;
    })
    .addCase("UpdateUserAddressSuccess",(state,action)=>{
      state.addressloading=false;
      state.successMessage = action.payload.successMessage;
      state.user=action.payload.user;
    })
    .addCase("UpdateUserAddressFail",(state,action)=>{
      state.addresslaoding=false;
      state.error=action.payload;
    })
    // delete a user address
    .addCase("DeleteUserAddressRequest",(state)=>{
      state.addresslaoding=true;
    })
    .addCase("DeleteUserAddressSuccess",(state,action)=>{
      state.addresslaoding=false;
      state.successMessage = action.payload.successMessage;
      state.user=action.payload.user;
    })
    .addCase("DeleteUserAddressFail",(state,action)=>{
      state.addresslaoding=false;
      state.error=action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});

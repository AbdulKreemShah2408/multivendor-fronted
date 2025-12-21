import axios from "axios"
import {server} from "../../server"

// create a event

export const createevent=(newForm)=>async(dispatch)=>{
    try {
        dispatch({
         type:"eventCreateRequest",
        });
        const config={headers:{"Content-Type":"multipart/form-data"}};
        const {data}=await axios.post(`${server}/event/create-event`,newForm,config,{
            withCredentials:true,
        });
        dispatch({
            type:"eventCreateSuccess",
            payload:data.event,
        })
    } catch (error) {
        dispatch({
            type:"eventCreateFail",
            payload:error.response.data.message,
        })
    }
}

// get All events
export const getAllEventsShop=(id)=>async(dispatch)=>{
    try {
         dispatch({
         type:"GetAllEventsShopRequest",
        });
        const {data}=await axios.get(`${server}/event/get-all-events-shop/${id}`,{
            withCredentials:true,
        });
         dispatch({
            type:"GetAllEventsShopSuccess",
            payload:data.events,
        })
    } catch (error) {
        dispatch({
            type:"GetAllEventsShopFail",
            payload:error.response.data.message,
        })
    }
};

// delete a event
export const deleteEvent=(id)=>async(dispatch)=>{
  try {
     dispatch({
         type:"DeleteEventRequest",
        });
        const {data}=await axios.delete(`${server}/event/delete-shop-event/${id}`,{
            withCredentials:true,
        });
        dispatch({
            type:"DeleteEventSuccess",
            payload:data.message,
        })
  } catch (error) {
     dispatch({
            type:"DeleteEventFail",
            payload:error.response.data.message,
        })
  }
}


// get all events
export const getAllEvents=()=>async(dispatch)=>{
    try {
         dispatch({
         type:"GetAllEventsRequest",
        });
        const {data}=await axios.get(`${server}/event/get-all-events`,{
            withCredentials:true,
        });
         dispatch({
            type:"GetAllEventsSuccess",
            payload:data.events,
        })
    } catch (error) {
        dispatch({
            type:"GetAllEventsFail",
            payload:error.response.data.message,
        })
    }
};


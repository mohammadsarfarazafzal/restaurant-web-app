import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";


// const getTokenFromApi=async () =>{
//   try {
//     const response=await axios.post("http://localhost:5000/api/refresh-token",{"name1":"ddd"},{withCredentials:true});

//     if(response.data?.accessToken){
//       console.log("Aa gya token",response.data.accessToken);
//       return response.data.accessToken;
//     }
//   } catch (error) {
//     console.error("Error while fetching token",error);
//     return null;
//   }
// }

// // Get token from cookies
// const getTokenFromCookies = () => {
//   const token = Cookies.get("accessToken");
//   console.log("TOKON  ",token);
//   return token || null;
// };


let initialToken=null;
async ()=>{
  initialToken=await getTokenFromApi();
};

const initialState = {
  token: initialToken,
};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state,action) => {
      state.token = null;
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;

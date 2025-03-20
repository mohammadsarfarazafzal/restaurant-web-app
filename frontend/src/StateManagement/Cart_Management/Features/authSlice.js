import { createSlice } from "@reduxjs/toolkit";



//set token with expiry

const setTokenWithExpiry=(token,expiryMinutes)=>{
  const now =new Date();
  const expiryTime=now.getTime()+expiryMinutes * 60 *1000;

  const tokenData={
    value:token,
    expiry:expiryTime,
  }
  localStorage.setItem("token",JSON.stringify(tokenData));
};

const getTokenFromStorage=()=>{
  const tokenData =localStorage.getItem("token");
  if(!tokenData){
    return null;
  }

  const parsedToken=JSON.parse(tokenData);
  const now=new Date();

  //checking if token expired
  if(now.getTime()>parsedToken.expiry){
    localStorage.removeItem("token");
    return null;
  }
  return parsedToken.value;
}

const initialState = {
  token: getTokenFromStorage(),
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      setTokenWithExpiry(action.payload,1);
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
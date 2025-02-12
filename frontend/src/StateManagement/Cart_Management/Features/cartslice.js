import {createSlice} from "@reduxjs/toolkit";


const initialState={
    cartItems:[],  //this array will store the items which will be added in the cart
};

export const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        //addtoCart function/reducer
        addToCart:(state,action)=>{
            //checking if cart has already some items
            const itemIndex=state.cartItems.findIndex(
                (item)=>item.id===action.payload.id
            )

            if(itemIndex>=0){
                state.cartItems[itemIndex].quantity+=1;
            }
            else{
                state.cartItems.push({...action.payload,quantity:1})
            }
            
            console.log("Updated cart:",state.cartItems);
            
        },
        //removing from cart
        removeFromCart:(state,action)=>{
            state.cartItems=state.cartItems.filter(
                (item)=>item.id !==action.payload
            );
        },
        //Clearing the whole cart
        clearCart:(state)=>{
            state.cartItems=[];
        }
    }
})

export const {addToCart,removeFromCart,clearCart}=cartSlice.actions;
export default cartSlice.reducer;
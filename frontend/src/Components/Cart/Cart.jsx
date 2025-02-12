import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {removeFromCart,clearCart} from "../../StateManagement/Cart_Management/Features/cartslice"

function Cart() {

    const cartItems=useSelector((state)=>state.cart.cartItems);
    const dispatch=useDispatch()
    // console.log(cartItems)
    
  return (
    <div className=''>
        <h2>Your Cart</h2>
        {
            
            cartItems.length===0 ?(
                <p>Cart is empty..</p>
            ):(
                <>
                {cartItems.map((dish)=>(
                    <div key={dish.id}>
                        <img src={dish.img} alt={dish.name} />
                        <h2>{dish.name}</h2>
                        <p>{dish.price * dish.quantity}</p>
                        {console.log(typeof(dish.price*dish.quantity))}
                        <button onClick={()=>{
                            dispatch(removeFromCart(dish.id))
                        }}>Remove</button>
                    </div>
                ))}
                <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
                </>
            )
        }
    </div>
  )
}

export default Cart
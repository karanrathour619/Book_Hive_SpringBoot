import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2';

const initialState = {
  cartItems: [],
  wishlistItems: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if(!existingItem){
                state.cartItems.push(action.payload)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product added to the cart",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            else{
                Swal.fire({
                    title: "Item already exists",
                    showClass: {
                      popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                      popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                  });
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
        },
        clearCart: (state) => {
            state.cartItems = []
        },
        addToWishlist: (state, action) => {
          const existingItem = state.wishlistItems.find(item => item._id === action.payload._id);
          if (!existingItem) {
            state.wishlistItems.push(action.payload);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product added to wishlist",
                showConfirmButton: false,
                timer: 1500
            });
          }
          else {
            Swal.fire({
                title: "Item already in wishlist",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
            });
          }
        },
        removeFromWishlist: (state, action) => {
          state.wishlistItems = state.wishlistItems.filter(item => item._id !== action.payload._id);
        },
        clearWishlist: (state) => {
          state.wishlistItems = [];
        },
    }
})

// EXPORT THE ACTIONS
export const { addToCart, removeFromCart, clearCart, addToWishlist, removeFromWishlist, clearWishlist } = cartSlice.actions;
export default cartSlice.reducer
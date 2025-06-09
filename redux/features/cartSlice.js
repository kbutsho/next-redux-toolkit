import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const calculateTotals = (state) => {
    let total = 0;
    let quantity = 0;

    state.cartItems.forEach(item => {
        total += item.price * item.cartQuantity;
        quantity += item.cartQuantity;
    });

    state.cartTotalQuantity = quantity;
    state.cartTotalAmount = parseFloat(total.toFixed(2));
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(`Increased cart quantity`);
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.title} added to cart`);
            }
            calculateTotals(state);
        },

        removeFromCart(state, action) {
            state.cartItems = state.cartItems.filter(
                (cartItem) => cartItem.id !== action.payload.id
            );
            toast.error(`${action.payload.title} removed from cart`);
            calculateTotals(state);
        },

        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (itemIndex >= 0) {
                if (state.cartItems[itemIndex].cartQuantity > 1) {
                    state.cartItems[itemIndex].cartQuantity -= 1;
                    toast.info("Decreased product quantity");
                } else {
                    state.cartItems = state.cartItems.filter(
                        (item) => item.id !== action.payload.id
                    );
                    toast.error("Product removed from cart");
                }
            }
            calculateTotals(state);
        },

        clearCart(state) {
            state.cartItems = [];
            toast.error("Cart cleared");
            calculateTotals(state);
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    decreaseCart,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

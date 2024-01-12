import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        basket: []
    },
    reducers: {
        addToBasket: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.basket.find(item => item.id === newItem.id);

            if (existingItem) {
                
                existingItem.quantity += 1;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
            } else {
                
                state.basket = [...state.basket, { ...newItem, quantity: 1, totalPrice: newItem.price }];
            }
        },
        deleteFromBasket: (state, action) => {
            const itemIdToDelete = action.payload.id;
            const itemIndex = state.basket.findIndex(item => item.id === itemIdToDelete);
          
            if (itemIndex !== -1) {
                if (state.basket[itemIndex].quantity > 1) {
                    state.basket[itemIndex].quantity -= 1;
                    state.basket[itemIndex].totalPrice = state.basket[itemIndex].quantity * state.basket[itemIndex].price;
                } else {
                    state.basket.splice(itemIndex, 1);
                }
            }
        },
          
    },
});

export const { addToBasket, deleteFromBasket } = counterSlice.actions;
export default counterSlice.reducer;

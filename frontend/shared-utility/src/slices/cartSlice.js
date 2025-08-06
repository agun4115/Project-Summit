import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
  totalItems: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {product, count} = action.payload;
      const productId = product.id
      if (state.items[productId]) {
        state.items[productId].count += count;
      } else {
        state.items[productId] = {
          ...product,
          count: count
        };
      }
      
      // Recalculate totals
      state.totalItems = Object.values(state.items).reduce((total, item) => total + item.count, 0);
      state.totalAmount = Object.values(state.items).reduce((total, item) => 
        total + (item.pricePerUnit * item.count), 0
      );
    },
    
    removeFromCart: (state, action) => {
      const productId = action.payload;
      if (state.items[productId]) {
        delete state.items[productId];
        
        // Recalculate totals
        state.totalItems = Object.values(state.items).reduce((total, item) => total + item.count, 0);
        state.totalAmount = Object.values(state.items).reduce((total, item) => 
          total + (item.pricePerUnit * item.count), 0
        );
      }
    },
    
    updateCount: (state, action) => {
      const { productId, count } = action.payload;
      if (state.items[productId]) {
        if (count <= 0) {
          delete state.items[productId];
        } else {
          state.items[productId].count = count;
        }
        
        // Recalculate totals
        state.totalItems = Object.values(state.items).reduce((total, item) => total + item.count, 0);
        state.totalAmount = Object.values(state.items).reduce((total, item) => 
          total + (item.pricePerUnit * item.count), 0
        );
      }
    },
    
    clearCart: (state) => {
      state.items = {};
      state.totalItems = 0;
      state.totalAmount = 0;
    },
    
    loadCart: (state, action) => {
      const cartData = action.payload;
      state.items = cartData || {};
      state.totalItems = Object.values(state.items).reduce((total, item) => total + item.count, 0);
      state.totalAmount = Object.values(state.items).reduce((total, item) => 
        total + (item.pricePerUnit * item.count), 0
      );
    }
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateCount, 
  clearCart, 
  loadCart 
} = cartSlice.actions;

export default cartSlice.reducer;

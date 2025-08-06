import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from './useAuth';
import { 
  addToCart as addToCartAction, 
  loadCart,
  removeFromCart as removeFromCartAction,
  updateCount as updateCountAction,
  clearCart as clearCartAction
} from '../slices/cartSlice';
import { 
  fetchCart, 
  removeFromCart as removeFromCartAPI,
  clearCart as clearCartAPI,
  updateCartItems as updateCartItemAPI,
  addToCart as addToCartAPI
} from '../Apis.js/CartApis';

export const useCart = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const cart = useSelector((state) => {
    if (!state || !state.cart) {
      return {
        items: {},
        totalItems: 0,
        totalAmount: 0
      };
    }
    return state.cart;
  });

  const syncCart = async () => {
    try {
      if (!user) {
        console.log('No user found, skipping cart sync');
        return;
      }
      const cartItems = await fetchCart(user.id);
      dispatch(loadCart(cartItems));
      return cartItems;
    } catch (error) {
      console.error('Failed to sync cart to backend:', error);
    }
  };


  const addToCart = async (product, count = 1) => {
    try {
      // Calculate total count if item already exists
      const existingItem = cart.items[product.id];
      const totalCount = existingItem ? existingItem.count + count : count;

      dispatch(addToCartAction({ product, count }));

      if (user?.id) {
        await addToCartAPI(user.id, product.id, totalCount);
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      dispatch(removeFromCartAction(productId));
      if (user?.id) {
        await removeFromCartAPI(user.id, productId);
      }
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const updateCount = async (productId, count) => {
    try {
      dispatch(updateCountAction({ productId, count }));      
      if (user?.id) {
        // const cartItemData = { productId, count };
        await updateCartItemAPI(user.id, productId, count);
      }
    } catch (error) {
      console.error('Failed to update cart item quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      dispatch(clearCartAction());
      
      if (user?.id) {
        await clearCartAPI(user.id);
      }
    } catch (error) {
      console.error('Failed to clear cart on backend:', error);
    }
  };

  return {
    addToCart,
    removeFromCart,
    updateCount,
    clearCart,
    syncCart,
    totalItems: cart.totalItems,
    items: Object.values(cart.items || {}),
    totalAmount: cart.totalAmount
  };
};
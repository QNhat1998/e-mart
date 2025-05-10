import { Product } from './sanity.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Interface định nghĩa cấu trúc của một item trong giỏ hàng
 * Interface defining the structure of a cart item
 */
export interface CartItem {
  product: Product; // Thông tin sản phẩm
  quantity: number; // Số lượng sản phẩm
}

/**
 * Interface định nghĩa state và actions của giỏ hàng
 * Interface defining cart state and actions
 */
interface CartState {
  items: CartItem[]; // Danh sách sản phẩm trong giỏ hàng
  addItem: (product: Product) => void; // Thêm sản phẩm vào giỏ hàng
  removeItem: (productId: string) => void; // Giảm số lượng sản phẩm
  deleteCartProduct: (productId: string) => void; // Xóa sản phẩm khỏi giỏ hàng
  resetCart: () => void; // Reset giỏ hàng
  getTotalPrice: () => number; // Tính tổng tiền (chưa tính giảm giá)
  getSubTotalPrice: () => number; // Tính tổng tiền (đã tính giảm giá)
  getItemCount: (productId: string) => number; // Lấy số lượng của một sản phẩm
  getGroupedItems: () => CartItem[]; // Lấy danh sách sản phẩm đã nhóm
}

/**
 * Zustand Store cho giỏ hàng
 * Cart store using Zustand with persistence
 *
 * Features:
 * - Persistent storage using localStorage
 * - Add/remove/delete cart items
 * - Calculate total and subtotal prices
 * - Track item quantities
 * - Group cart items
 */
const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [], // Initial state: empty cart

      // Thêm sản phẩm vào giỏ hàng
      // Add item to cart
      addItem: product =>
        set(state => {
          const existingItem = state.items.find(item => item.product._id === product._id);
          if (existingItem) {
            // Tăng số lượng nếu sản phẩm đã tồn tại
            // Increment quantity if item exists
            return {
              items: state.items.map(item =>
                item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          } else {
            // Thêm sản phẩm mới với số lượng 1
            // Add new item with quantity 1
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),

      // Giảm số lượng sản phẩm
      // Remove item from cart
      removeItem: productId =>
        set(state => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartItem[]),
        })),

      // Xóa sản phẩm khỏi giỏ hàng
      // Delete item from cart
      deleteCartProduct: productId =>
        set(state => ({
          items: state.items.filter(({ product }) => product?._id !== productId),
        })),

      // Reset giỏ hàng
      // Reset cart
      resetCart: () => set({ items: [] }),

      // Tính tổng tiền (chưa tính giảm giá)
      // Calculate total price (without discount)
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        );
      },

      // Tính tổng tiền (đã tính giảm giá)
      // Calculate subtotal price (with discount)
      getSubTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = ((item.product.discount ?? 0) * price) / 100;
          const discountedPrice = price + discount;
          return total + discountedPrice * item.quantity;
        }, 0);
      },

      // Lấy số lượng của một sản phẩm
      // Get quantity of an item
      getItemCount: productId => {
        const item = get().items.find(item => item.product._id === productId);
        return item ? item.quantity : 0;
      },

      // Lấy danh sách sản phẩm đã nhóm
      // Get grouped items
      getGroupedItems: () => get().items,
    }),
    { name: 'cart-store' } // Tên key trong localStorage
  )
);

export default useCartStore;

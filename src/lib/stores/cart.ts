import { writable } from 'svelte/store';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

function createCart() {
    const { subscribe, set, update } = writable<CartItem[]>([]);

    return {
        subscribe,
        addItem: (item: Omit<CartItem, 'quantity'>) => {
            update(items => {
                const existingItem = items.find(i => i.id === item.id);
                if (existingItem) {
                    return items.map(i => 
                        i.id === item.id 
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    );
                }
                return [...items, { ...item, quantity: 1 }];
            });
        },
        removeItem: (id: string) => {
            update(items => items.filter(item => item.id !== id));
        },
        updateQuantity: (id: string, quantity: number) => {
            if (quantity < 1) return;
            update(items => 
                items.map(item => 
                    item.id === id 
                        ? { ...item, quantity }
                        : item
                )
            );
        },
        clearCart: () => set([]),
        getTotal: (items: CartItem[]) => {
            return items.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
    };
}

export const cart = createCart(); 
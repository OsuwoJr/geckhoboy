import { writable } from 'svelte/store';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

function createToastStore() {
  const { subscribe, update } = writable<Toast[]>([]);
  let nextId = 1;

  return {
    subscribe,
    add: (message: string, type: Toast['type'] = 'info', duration = 3000) => {
      const id = nextId++;
      update(toasts => [...toasts, { id, message, type, duration }]);
      setTimeout(() => {
        update(toasts => toasts.filter(t => t.id !== id));
      }, duration);
    },
    remove: (id: number) => {
      update(toasts => toasts.filter(t => t.id !== id));
    }
  };
}

export const toast = createToastStore(); 
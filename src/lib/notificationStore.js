import { create } from 'zustand';

import { apiRequest } from './apiRequest';

export const useNotificationStore = create((set) => ({
  count: 0,
  fetch: async () => {
    try {
      const { data } = await apiRequest.get('/users/notification');
      set({ count: data });
    } catch (error) {}
  },
  decrease: () => {
    set((prev) => ({ count: prev.count - 1 }));
  },
}));

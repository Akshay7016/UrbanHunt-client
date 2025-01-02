import { create } from 'zustand';

export const useSelectChat = create((set) => ({
  selectChat: null,
  setSelectChat: (chatId) => set({ selectChat: chatId }),
}));

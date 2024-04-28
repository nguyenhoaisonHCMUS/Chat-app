// import { ConversationType } from "@/types";
import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages: string[]) => set({ messages }),
}));

export default useConversation;
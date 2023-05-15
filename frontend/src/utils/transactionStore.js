import { create } from "zustand";
import { persist } from "zustand/middleware";

export const transactionStore = create(
	persist(
		(set) => ({
			transactionType: "expense",
			setTransactionType: (value) => set({ transactionType: value }),
		}),
		{ name: "transaction-storage" }
	)
);

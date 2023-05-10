import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStore = create(
	persist(
		(set) => ({
			userID: null,
			username: null,
			setUserID: (value) => set({ userID: value }),
			setUsername: (value) => set({ username: value }),
		}),
		{ name: "user-storage" }
	)
);

//! if cookies get checked through middleware in each route, userStore can be deleted

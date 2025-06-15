import { UserInterface } from "../types/user";


export interface rootState {
  auth: {
    token: string | null;
    loading: boolean;
    error: string | null;
  };
  users: {
    users: UserInterface[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
  };
}

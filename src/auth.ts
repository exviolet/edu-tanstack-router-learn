export type AuthContext = {
  isAuthenticated: boolean;
  username: string | null;
};

export const auth: AuthContext = {
  isAuthenticated: true,
  username: "Student",
};

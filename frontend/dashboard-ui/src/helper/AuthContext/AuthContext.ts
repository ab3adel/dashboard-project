import { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../interfaces';



type AuthContextType = {
  user: User | null;
  login: (data: { accessToken: string; user: User }) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

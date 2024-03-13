import { Request, Response } from 'express';
import AuthService from '../services/authService';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await AuthService.login({ email, password });
    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  };
};

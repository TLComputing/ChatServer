import { Request, Response } from 'express';
import UserService from '../services/userService';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await UserService.create({ username, email, password });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  };
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAll();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  };
};

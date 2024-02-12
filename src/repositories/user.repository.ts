import { v4 as uuidv4 } from 'uuid';
import { User } from 'models';

const users: User[] = [];

export const getUsers = (): User[] => users;

export const getUser = (id: string): User | null => {
  return users.find((user) => user.id === id) || null;
};

export const createUser = (user: Omit<User, 'id'>): User => {
  const newUser = {
    id: uuidv4(),
    ...user,
  };
  users.push(newUser);
  return newUser;
};

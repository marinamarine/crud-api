import { v4 as uuidv4 } from 'uuid';
import { UpdateUserData, User } from '../models';

const users: User[] = [];

export const getUsers = (): User[] => users;

export const getUser = (id: string): User | undefined => {
  return users.find((user) => user.id === id);
};

export const createUser = (user: Omit<User, 'id'>): User => {
  const newUser = {
    id: uuidv4(),
    ...user,
  };
  users.push(newUser);
  return newUser;
};

export const updateUser = (
  id: string,
  userData: UpdateUserData,
): User | undefined => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return;
  }
  const user = users[index] as User;

  users[index] = {
    ...user,
    ...userData,
  };

  return users[index];
};

export const deleteUser = (id: string): boolean => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return false;
  }
  users.splice(index, 1);
  return true;
};

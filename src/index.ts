import 'dotenv/config';
import { addRoute } from './router';
import { startServer } from './server';
import { getUsersHandler, getUserHandler, createUserHandler } from './handlers';
const baseUsersPath = '/api/users';

addRoute('GET', `${baseUsersPath}/{userId}`, getUserHandler);

addRoute('GET', baseUsersPath, getUsersHandler);

addRoute('POST', baseUsersPath, createUserHandler);

startServer();

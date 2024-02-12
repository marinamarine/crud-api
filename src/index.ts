import 'dotenv/config';
import { addRoute } from './router';
import { startServer } from './server';
import { getUsersHandler } from './handlers';
const baseUsersPath = '/api/users';

addRoute('GET', baseUsersPath, getUsersHandler);

startServer();
